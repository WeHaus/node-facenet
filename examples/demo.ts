#!/usr/bin/env ts-node
import * as assert  from 'assert'

import {
  Facenet,
  imageToData,
  log,
  loadImage,
  saveJpeg,
}                   from '../'  // from 'facenet'

async function main() {
  // Instanciate FaceNet
  const facenet = new Facenet()

  try {
    // Load image from file
    const imageFile = `${__dirname}/../tests/fixtures/two-faces.jpg`
    const image = await loadImage(imageFile)
    const imageData = imageToData(image)

    // Do Face Alignment, return faces
    const faceList = await facenet.align(imageData)

    for (const face of faceList) {
      // Calculate Face Embedding, return feature vector
      // const embedding = await facenet.embedding(face)
      // assert(face.embedding === embedding,
      //       'Save embedding to face. Also return it for convenience')
      assert(true)

      const faceFile = `${face.md5}.jpg`
      saveJpeg(face.imageData, faceFile)

      console.log('image file:',    imageFile)
      console.log('face file:',     faceFile)
      console.log('bounding box:',  face.boundingBox)
      console.log('landmarks:',     face.facialLandmark)
      // console.log('embedding:',     face.embedding)
    }
  } finally {
    facenet.quit()
  }
}

log.level('silly')

main()
.catch(console.error)
