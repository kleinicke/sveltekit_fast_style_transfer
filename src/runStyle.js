// import ndarray from 'ndarray'
// import ops from 'ndarray-ops'
// import { Tensor, InferenceSession } from 'onnxjs';
// import onnxjs from 'onnxjs'

export function drawCanvas(
  imageSrc,
  canvasName,
  imageSize,
  initFinished = true
) {
  if (initFinished) {
    const canvas = document.getElementById(canvasName)
    // console.log("c",canvas)
    const ctx = canvas.getContext('2d')
    const image = new Image(imageSize, imageSize)
    image.src = imageSrc
    function drawImageActualSize() {
      canvas.width = imageSize //this.naturalWidth;
      canvas.height = imageSize //this.naturalHeight;
      ctx.drawImage(this, 0, 0, this.width, this.height)
    }
    image.onload = drawImageActualSize
  }
}

async function getData(imageSrc, imageSize) {
  let canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const image = new Image(imageSize, imageSize)
  image.src = imageSrc
  await new Promise((resolve, reject) => {
    image.onload = () => resolve(image.height)
    image.onerror = reject
    image.src = imageSrc
  })
  canvas.width = imageSize
  canvas.height = imageSize
  ctx.drawImage(image, 0, 0, image.width, image.height)
  const imgData = ctx.getImageData(0, 0, imageSize, imageSize).data
  return new Float32Array(imgData)
}

export async function prepareAndRunStyle(
  imageSrc,
  resultCanvas,
  imageSize,
  style,
  hasLoaded = true
) {
  if (hasLoaded) {
    const onnxjs = 0 //await import('onnxjs')
    const ops = 0 //await import('ndarray-ops')
    const ndarray = 0 //(await import('ndarray'))['default']
    // console.log('ndarray', ndarray['default'])
    let floatData = await getData(imageSrc, imageSize)
    let dataFromImage = ndarray(floatData, [imageSize, imageSize, 4])
    let dataProcessed = ndarray(new Float32Array(imageSize * imageSize * 3), [
      1,
      3,
      imageSize,
      imageSize,
    ])
    ops.assign(
      dataProcessed.pick(0, 2, null, null),
      dataFromImage.pick(null, null, 2)
    )
    ops.assign(
      dataProcessed.pick(0, 1, null, null),
      dataFromImage.pick(null, null, 1)
    )
    ops.assign(
      dataProcessed.pick(0, 0, null, null),
      dataFromImage.pick(null, null, 0)
    )
    const inputTensor = new onnxjs.Tensor(
      new Float32Array(3 * imageSize * imageSize),
      'float32',
      [1, 3, imageSize, imageSize]
    )
    inputTensor.data.set(dataProcessed.data)
    console.log('preprocessed data', floatData, dataFromImage, dataProcessed)
    dataFromImage = null
    dataProcessed = null
    // Creat the session and load the pre-trained model
    let session = new onnxjs.InferenceSession({
      backendHint: 'webgl',
    })
    await session.loadModel(style + imageSize + '.onnx')
    // Run model with Tensor inputs and get the result.
    const outputMap = await session.run([inputTensor])
    session = null
    let outputData = outputMap.values().next().value.data
    const dataFromImageBack = ndarray(
      new Float32Array(imageSize * imageSize * 4),
      [imageSize, imageSize, 4]
    )
    const dataProcessedBack = ndarray(new Float32Array(outputData), [
      1,
      3,
      imageSize,
      imageSize,
    ])
    ops.assign(
      dataFromImageBack.pick(null, null, 0),
      dataProcessedBack.pick(0, 0, null, null)
    )
    ops.assign(
      dataFromImageBack.pick(null, null, 1),
      dataProcessedBack.pick(0, 1, null, null)
    )
    ops.assign(
      dataFromImageBack.pick(null, null, 2),
      dataProcessedBack.pick(0, 2, null, null)
    )
    let dataForImage = dataFromImageBack.data
    for (let y = 0; y < imageSize; y++) {
      for (let x = 0; x < imageSize; x++) {
        let pos = (y * imageSize + x) * 4 // position in buffer based on x and y
        dataForImage[pos + 3] = 255 // set alpha channel
      }
    }
    console.log(
      'result',
      outputMap,
      dataFromImageBack,
      dataProcessedBack,
      dataForImage
    )
    let canvas = document.getElementById(resultCanvas)
    let ctx = canvas.getContext('2d')
    canvas.width = imageSize
    canvas.height = imageSize
    // create imageData object
    let idata = ctx.createImageData(imageSize, imageSize)
    // set our buffer as source
    idata.data.set(dataForImage)
    // update canvas with new data
    ctx.putImageData(idata, 0, 0)
  }
}
