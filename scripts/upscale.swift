// Upscale com Lanczos + unsharp sutil: melhor que o scaling do navegador.
// Uso: swift scripts/upscale.swift <entrada.png> <saida.png> <escala>
import CoreImage
import Foundation

let args = CommandLine.arguments
guard args.count == 4, let scale = Double(args[3]) else {
    fatalError("uso: swift upscale.swift <entrada.png> <saida.png> <escala>")
}

let src = URL(fileURLWithPath: args[1])
let dst = URL(fileURLWithPath: args[2])

guard let image = CIImage(contentsOf: src) else {
    fatalError("não foi possível abrir \(src.path)")
}

let lanczos = CIFilter(name: "CILanczosScaleTransform", parameters: [
    kCIInputImageKey: image,
    kCIInputScaleKey: scale,
    kCIInputAspectRatioKey: 1.0,
])!

// Intensidade baixa para não criar halos na borda do recorte
let sharpen = CIFilter(name: "CIUnsharpMask", parameters: [
    kCIInputImageKey: lanczos.outputImage!,
    kCIInputRadiusKey: 1.8,
    kCIInputIntensityKey: 0.4,
])!

let context = CIContext()
let colorSpace = image.colorSpace ?? CGColorSpace(name: CGColorSpace.sRGB)!
let output = sharpen.outputImage!
try context.writePNGRepresentation(
    of: output.cropped(to: output.extent),
    to: dst,
    format: .RGBA8,
    colorSpace: colorSpace
)

print("ok: \(dst.lastPathComponent)")
