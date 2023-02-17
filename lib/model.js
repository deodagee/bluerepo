import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const isDev = process.env.NODE_ENV === 'development'
const urlDogGLB = isDev ? '/dog.glb' : '/public_html/dog.glb'

export const loadGLTFModel = (scene, options) => {
  const loader = new GLTFLoader()
  return new Promise((resolve, reject) => {
    loader.load(urlDogGLB, (gltf) => {
      const model = gltf.scene
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = options.castShadow || false
          child.receiveShadow = options.receiveShadow || false
        }
      })
      scene.add(model)
      resolve(model)
    }, undefined, (error) => {
      console.error(`Failed to load GLTF model: ${error}`)
      reject(error)
    })
  })
}