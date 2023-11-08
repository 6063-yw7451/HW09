## Summary ##
The provided code is utilizing the p5.js library and ML5.js ("https://unpkg.com/ml5@latest/dist/ml5.min.js") for a web-based application that incorporates a live video feed, image manipulation, and interaction using hand gestures captured through a camera. It allows different modes of interaction with the displayed image and video feed by detecting the index finger and thumb positions from the captured video.

## Original Idea ##
I want to combine camera recognition with gestures to do some interactions.

## Process ##
1. Hand Gesture Detection:
Utilizes the Handpose model from ML5.js to detect the position of the index finger and thumb in the captured video.
2. Interaction Modes:
     - "v": View image mode - Shows a blurred version of the loaded image and tracks the corresponding area based on the index finger's position in the video feed.
     - "f": Freehand drawing mode - Allows the user to draw freely on the image using the index finger's movement.
     - "c": Circle drawing mode - Draws circles on the image based on the index finger's movement, with the circle's size based on the distance between the index finger and thumb.
     - "e": Exits the view image, freehand drawing, or circle drawing mode and returns to displaying the original image.
It requires the p5.js and ml5.js libraries to be linked in the HTML file.

## What did you end up implementing ##
I track the index finger's movements, display different interaction modes on the image, and allow users to manipulate the displayed content using their index finger in the video feed.

## Challenge ##
1. Utilizing hand gesture recognition (in this case, detecting the index finger and thumb) might be challenging due to variations in lighting, hand positioning, or model accuracy. Calibration and addressing potential inaccuracies are essential. 
2. Creating various interaction modes (view image, freehand drawing, circle drawing) involves complex logic to switch between these modes based on key inputs. Coordinating different modes and their functionalities can be intricate.

