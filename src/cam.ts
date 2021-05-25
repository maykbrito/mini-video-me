import { config } from './config'

type MovePosition = 'left' | 'right' | 'up' | 'down'

type ZoomType = 'in' | 'out'

export class CameraController {
  public videoElement: HTMLVideoElement;

  private videoWrapper: HTMLDivElement;
  private isFlipped: boolean;
  private isRounded: boolean;
  private position: Record<'x' | 'y' | 'z', number>

  constructor() {
    this.videoWrapper = document.getElementById('wrapper') as HTMLDivElement
    this.videoElement = document.getElementById('video') as HTMLVideoElement

    this.isFlipped = config.flipHorizontal
    this.isRounded = config.rounded

    this.position = {
      x: config.horizontal,
      y: config.vertical,
      z: config.scale
    }

    this.render()
  }

  public flipHorizontal() {
    this.isFlipped = !this.isFlipped;

    this.render();
  } 

  public adjustOffset(position: MovePosition) {
    switch (position) {
      case 'up':
        this.position.y -= 1;
        break;
      case 'down':
        this.position.y += 1;
        break;
      case 'left':
        this.position.x -= 1;
        break;
      case 'right':
        this.position.x += 1;
        break;
    }

    this.render()
  }

  public zoom(type: ZoomType) {
    if (type === 'in') {
      this.position.z += 0.1;
    } else {
      this.position.z -= 0.1;
    }

    this.render();
  }

  public round() {
    this.isRounded = !this.isRounded;

    this.render()
  }

  private render() {
    let transform: string[] = []
    let classList: string[] = []

    transform.push(`translate(${this.position.x}%, ${this.position.y}%)`)
    transform.push(`scale(${this.position.z})`)

    if (this.isFlipped) {
      classList.push('flip')
      transform.push('rotateY(180deg)');
    }

    this.videoElement.style.transform = transform.join(' ')
    this.videoElement.className = classList.join(' ')
    this.videoWrapper.className = this.isRounded ? 'rounded' : ''
  }
}

// export function Cam () {
//   const state = {
//     videoWrapper: document.getElementById('wrapper') as HTMLDivElement,
//     video: document.getElementById('video') as HTMLVideoElement,
//     isFlipped: config.flipHorizontal,
//     position: {
//       x: config.horizontal,
//       y: config.vertical,
//       z: config.scale
//     },
//     rounded: config.rounded,
//     move: {},
//     scale: '',
//     transform: [] as string[],
//     translate: '',
    
//   }

//   const flipHorizontal = () => {
//     // remove flip
//     state.video.classList.remove('flip')
//     state.transform = state.transform.filter(item => item !== 'rotateY(180deg)')

//     if (state.isFlipped) {
//       // add flip
//       state.video.classList.add('flip')
//       state.transform.push('rotateY(180deg)')
//     } else {
//       state.transform.push('rotateY(1deg)')
//     }

//     videoTransform()
//   }

//   const toggleFlipHorizontal = () => {
//     state.isFlipped = !state.isFlipped
//     flipHorizontal()
//   }

//   const move = pos => {
//     const positions = {
//       left: () => state.position.x++,
//       right: () => state.position.x--,
//       up: () => state.position.y--,
//       down: () => state.position.y++
//     }
//     positions[pos]()
//     repositionCameraInsideBall()
//   }

//   const repositionCameraInsideBall = () => {
//     // clean old translate
//     state.transform = state.transform.filter(item => item !== state.translate)

//     // update translate
//     state.translate = `translate(${state.position.x}%, ${state.position.y}%)`

//     // curiosity: In CSS if I put rotate first, it will use translate
//     // in rotation mode (I think). So, we need to put translate first.
//     state.transform.unshift(state.translate)

//     videoTransform()
//   }

//   const zoom = type => {
//     state.transform = state.transform.filter(item => item !== state.scale)

//     const zoomIn = state.position.z + 0.1
//     const zoomOut = state.position.z - 0.1

//     state.position.z = type === 'in' ? zoomIn : zoomOut

//     state.scale = `scale(${state.position.z})`
//     state.transform.push(state.scale)
//     videoTransform()
//   }

//   const videoTransform = () => {
//     const transform = state.transform.join(' ')
//     state.video.style.transform = transform
//   }

//   const roundedFrame = () => {
//     state.videoWrapper.classList.remove('rounded')

//     if (state.rounded) {
//       state.videoWrapper.classList.add('rounded')
//     }
//   }

//   const toggleRoundedFrame = () => {
//     state.rounded = !state.rounded
//     roundedFrame()
//   }

//   return {
//     ...state,
//     init () {
//       repositionCameraInsideBall()
//       flipHorizontal()
//       zoom()
//       roundedFrame()
//     }
//   }
// }

