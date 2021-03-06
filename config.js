// General Params
const WINDOW_HEIGHT = $(window).height(); // remove windowHeight after fusion is done
const TOP_REGION = 0.3;
const BOTTOM_REGION = 0.6;

// Motion Params
const PIXEL_DIFF = 40;
const SCORE_THRESH = 30;
const MOTION_X = 40;
const MOTION_Y = 30;

// Gaze Params
const GAZE_INTERVAL = 3; // in seconds

// Fusion Params
const MOTION_W = 0.5;
const SPEECH_W = 1 - MOTION_W;

const LINE_W = 0.6;
const GAZE_W = 1 - LINE_W;

// Fused Scrolling Params
const SCROLL_AMT_DEFAULT = 7; // range: [0, 5] pixels
const SCROLL_INTERVAL = 1000; // in ms

const MAX_SCROLL_DELTA = 700;
const MIN_SCROLL_DELTA = 0; // can scroll up a little, can change if necessary
const IDEAL_SCROLL_DELTA = 0; // range: [-SCROLL_AMT_DEFAULT, 0]