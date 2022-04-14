prediction_1 = ""
prediction_2 = ""
function take_selfie(){
  Webcam.snap(function(data_uri){
      document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'/>";
  })
}
console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/QVybxR5Jf/model.json", modelLoaded);
function modelLoaded(){
    console.log("Model Loaded!")
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    speak_data_2 = "The second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis); 
}
function check(){
  img = document.getElementById("captured_image");
  classifier.classify(img, gotResults)
}
function gotResults(error, results){
   if(error){ 
       console.log(error)
   }else{
    document.getElementById("gesture_prediction").innerHTML = results[0].label;
    document.getElementById("gesture_prediction2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if(results[0].label == "Ok"){
      document.getElementById("update_emoji").innerHTML = "👌";
    }
    else if(results[0].label == "Peace and Victory"){
      document.getElementById("update_emoji").innerHTML = "✌";
    }
     else if(results[0].label == "Gratitude"){
      document.getElementById("update_emoji").innerHTML = "🙏"
    }else{
      document.getElementById("update_emoji").innerHTML = "👍"
    }
    if(results[1].label == "Ok"){
      document.getElementById("update_emoji_2").innerHTML = "👌";
    }
    else if(results[1].label == "Peace and Victory"){
      document.getElementById("update_emoji_2").innerHTML = "✌";
    }
     else if(results[1].label == "Gratitude"){
      document.getElementById("update_emoji_2").innerHTML = "🙏"
    }else{
      document.getElementById("update_emoji_2").innerHTML = "👍"
    }
   }  
}