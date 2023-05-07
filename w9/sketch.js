let paint = [];

let prevPointer = [  [    { x: 0, y: 0 },    { x: 0, y: 0 },    { x: 0, y: 0 },    { x: 0, y: 0 }  ],
  [    { x: 0, y: 0 },    { x: 0, y: 0 },    { x: 0, y: 0 },    { x: 0, y: 0 }  ]
];

const fingertips = [8, 12, 16, 20];

function setup() {
  sketch = createCanvas(1,1);
  
  const colorMap = [    [color(0, 0, 0), color(255, 0, 255), color(0, 0, 0), color(255, 255, 255)],
    [color(255, 0, 0), color(0, 0, 0), color(0, 0, 0), color(255, 255, 0)]
  ];
  handsfree = new Handsfree({
    showDebug: true,
    hands: true
  });
  handsfree.enablePlugins('browser');
  handsfree.plugin.pinchScroll.disable();
  
  buttonStart = createButton('Start WebcameraCatch');
  buttonStart.class('handsfree-show-when-stopped');
  buttonStart.class('handsfree-hide-when-loading');
  buttonStart.mousePressed(() => handsfree.start());

  buttonLoading = createButton('...loading...');
  buttonLoading.class('handsfree-show-when-loading');

  buttonStop = createButton('Stop Webcam');
  buttonStop.class('handsfree-show-when-started');
  buttonStop.mousePressed(() => handsfree.stop());
}
  
function draw() {
  drawHands();
}

function drawHands() {
  const hands = handsfree.data?.hands;
  
  if (!hands?.landmarks) return;
  
  hands.landmarks.forEach((hand, handIndex) => {
    hand.forEach((landmark, landmarkIndex) => {
   
      if (colorMap[handIndex]) {
        switch (landmarkIndex) {
          case 8: fill(colorMap[handIndex][0]); break;
          case 12: fill(colorMap[handIndex][1]); break;
          case 16: fill(colorMap[handIndex][2]); break;
          case 20: fill(colorMap[handIndex][3]); break;
          default: fill(color(255, 255, 255));
        }                
      }
      
      if (handIndex === 0 && landmarkIndex === 8) {
        stroke(color(255, 255, 255));
        strokeWeight(50);
        circleSize = 40;
      } else {
        stroke(color(0, 0, 0));
        strokeWeight(0);
        circleSize = 10;
      }
      
      circle(
        sketch.width - landmark.x * sketch.width,
        landmark.y * sketch.height,
        circleSize
      );
    });
  });
}