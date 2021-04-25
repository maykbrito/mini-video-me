import cameraConfig from "./cameraConfig.js";

function Cam() {
	const state = {
		videoWrapper: document.getElementById("wrapper"),
		video: document.getElementById("video"),
		isFlipped: cameraConfig.flipHorizontal,
		position: {
			x: cameraConfig.horizontal,
			y: cameraConfig.vertical,
			z: cameraConfig.scale,
		},
		rounded: cameraConfig.rounded,
		move: {},
		scale: "",
		transform: [],
		translate: "",
		controls: {
			ArrowLeft: () => move("left"),
			ArrowRight: () => move("right"),
			ArrowUp: () => move("up"),
			ArrowDown: () => move("down"),
			"=": () => zoom("in"),
			"-": () => zoom("out"),
			"/": () => toggleFlipHorizontal(),
			o: () => toggleRoundedFrame(),
		},
	};

	const flipHorizontal = () => {
		// Remove flip
		state.video.classList.remove("flip");
		state.transform = state.transform.filter(
			(item) => item != "rotateY(180deg)"
		);

		if (state.isFlipped) {
			// Add flip
			state.video.classList.add("flip");
			state.transform.push("rotateY(180deg)");
		} else {
			state.transform.push("rotateY(1deg)");
		}

		videoTransform();
	};

	const toggleFlipHorizontal = () => {
		state.isFlipped = !state.isFlipped;
		flipHorizontal();
	};

	const move = (pos) => {
		const positions = {
			left: () => state.position.x++,
			right: () => state.position.x--,
			up: () => state.position.y--,
			down: () => state.position.y++,
		};
		positions[pos]();
		repositionCameraInsideBall();
	};

	const repositionCameraInsideBall = () => {
		// Clean old translate
		state.transform = state.transform.filter((item) => item != state.translate);

		// Update translate
		state.translate = `translate(${state.position.x}%, ${state.position.y}%)`;

		// Curiosity: in CSS, if I put rotate first, it will use translate
		// In rotation mode (I think). So, we need to put translate first.
		state.transform.unshift(state.translate);

		videoTransform();
	};

	const zoom = (type) => {
		state.transform = state.transform.filter((item) => item != state.scale);

		const zoomIn = state.position.z + 0.1;
		const zoomOut = state.position.z - 0.1;

		state.position.z = type === "in" ? zoomIn : zoomOut;

		state.scale = `scale(${state.position.z})`;
		state.transform.push(state.scale);
		videoTransform();
	};

	const videoTransform = () => {
		let transform = state.transform.join(" ");
		state.video.style.transform = transform;
	};

	const roundedFrame = () => {
		state.videoWrapper.classList.remove("rounded");

		if (state.rounded) {
			state.videoWrapper.classList.add("rounded");
		}
	};

	const toggleRoundedFrame = () => {
		state.rounded = !state.rounded;
		roundedFrame();
	};

	return {
		...state,
		init() {
			repositionCameraInsideBall();
			flipHorizontal();
			zoom();
			roundedFrame();
		},
	};
}

export default Cam();
