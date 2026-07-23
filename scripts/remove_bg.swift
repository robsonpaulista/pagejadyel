// Remove o fundo usando o matting de pessoa do Vision (macOS 14+).
// Uso: swift scripts/remove_bg.swift <entrada.png> <saida.png>
import CoreImage
import Foundation
import Vision

let args = CommandLine.arguments
guard args.count == 3 else {
    fatalError("uso: swift remove_bg.swift <entrada.png> <saida.png>")
}

let src = URL(fileURLWithPath: args[1])
let dst = URL(fileURLWithPath: args[2])

guard let image = CIImage(contentsOf: src) else {
    fatalError("não foi possível abrir \(src.path)")
}

let request = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(ciImage: image)
try handler.perform([request])

guard let result = request.results?.first else {
    fatalError("nenhuma instância de primeiro plano encontrada")
}

let maskBuffer = try result.generateScaledMaskForImage(
    forInstances: result.allInstances,
    from: handler
)
let mask = CIImage(cvPixelBuffer: maskBuffer)

let blend = CIFilter(name: "CIBlendWithMask", parameters: [
    kCIInputImageKey: image,
    kCIInputBackgroundImageKey: CIImage.empty(),
    kCIInputMaskImageKey: mask,
])!

let context = CIContext()
let colorSpace = image.colorSpace ?? CGColorSpace(name: CGColorSpace.sRGB)!
try context.writePNGRepresentation(
    of: blend.outputImage!.cropped(to: image.extent),
    to: dst,
    format: .RGBA8,
    colorSpace: colorSpace
)

print("ok: \(dst.lastPathComponent)")
