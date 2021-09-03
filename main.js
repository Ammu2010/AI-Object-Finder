status = "";
objects = [];

function setup() {
    canvas = createCanvas(400, 300)
    canvas.position(500, 320)
    video = createCapture(VIDEO)
    video.size(400,300)
    video.hide()
}

function modelLoaded() {
    console.log("model Loaded succesfully !")
    status = true;
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        objects = results;

    }
}

function draw() {
    image(video, 0, 0, 400, 300)
    if (status != "") {
        objectdetector.detect(video, gotResults)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Object Detected"
            //
            obj_name = objects[i].label
            percentage = floor(objects[i].confidence * 100);
            pose_x = objects[i].x
            pose_y = objects[i].y
            width = objects[i].width
            height = objects[i].height
            fill("#f53387")
            textSize(20)
            text(obj_name, pose_x , pose_y )
            noFill()
            stroke("#f53387")
            strokeWeight(3)
            rect(pose_x - 20, pose_y - 60, width, height)
            if(obj_name == input_object){
                document.getElementById("noo").innerHTML = input_object + " FOUND"
            }
            else{
                document.getElementById("noo").innerHTML = input_object + " NOT FOUND"
            }
        }
    }
}
function start_f() {
    
    objectdetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Detecting Object"
    input_object = document.getElementById("input_o").value
}