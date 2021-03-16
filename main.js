'use strict';

var imageText = [
    {
        text: "we are breaking our vow of silence.",
        placement: "0 0 0 0"
    },
    {
        text: "talent is given true skill is earned",
        placement: "35% 4% 0 0"
    },
    {
        text: "be felxible to change and sturdy in conviction",
        placement: "35% 4% 0 0"
    },
    {
        text: "use many skills yet work as one",
        placement: "0 0 4% 35%"
    },
    {
        text: "to master anything find interest in everything",
        placement: "0 0 4% 35%"
    },
    {
        text: "individuals flourish if culture and wisdom are shared",
        placement: "0 0 4% 35%"
    },
    {
        text: "train for perfection but aim for more",
        placement: "35% 4% 0 0"
    },
    {
        text: "take pride in your work but do not seek praise",
        placement: "35% 4% 0 0"
    },
    {
        text: "temporary sacrifice brings lasting results",
        placement: "35% 4% 0 0"
    }
]

var monkSlider = (function(){
    var current = 1;
    var previous = -1; 

    function moveImage(currentIdx, prevIdx){
        document.querySelector(".sliderText").style.display = "none";
        var id = null;        
        var pos = prevIdx>=0? prevIdx*35 : 0;
        //copied from w3schools as animate function on 
        //DOM element was not working correctly on background property
        console.log("current, previous, currentIdx, prevIdx, pos",current, previous, currentIdx, prevIdx, pos);
        clearInterval(id);
        id = setInterval(frame, 1);
        function frame() {
            if (pos == currentIdx*35) {
                clearInterval(id);
                getImageText(currentIdx);
            } else {
                pos = current>previous ? pos+0.5 : pos-0.5; 
                document.querySelector(".slider").style.backgroundPositionX = "-"+pos+"%"   
            }
        }
    }

    function getImageText(idx){
        document.querySelector(".sliderText").style.display = "block";
        let postion = imageText[idx-1].placement.split(" ");
        const arrayPosition = ["top", "left", "right", "bottom"];
        for (let i=0; i<postion.length; i++){
            if(parseInt(postion[i],10) !=0){
                document.querySelector(".sliderText").style[arrayPosition[i]] = postion[i];
            }
        }        
        document.querySelector(".sliderText").innerHTML = imageText[idx-1].text;
        document.querySelector(".pathText").style.display = "inline-block";
        document.querySelector(".prev").style.display = "block";
        document.querySelector(".next").style.display = "block";
        if(idx === 1){
            document.querySelector(".pathText").style.display = "none";
            document.querySelector(".prev").style.display = "none";
        }
        if(idx === 10){
            document.querySelector(".pathText").style.display = "none";
            document.querySelector(".next").style.display = "none";
        }    
        document.querySelector("#stepNumber").innerHTML = (idx-1).toString();   
    }

    return {
        initialize: function(){
            getImageText(current);
            current = 1;
            previous = current-1;
        }, 
                
        showNext: function(){
            if(current === 10){
                return;
            }
            moveImage(current, previous);
            current++;            
            previous = current-1;  
        },
    
        showPrevious: function(){
            if(current === 0){
                return;
            }
            current--;
            moveImage(current, previous);
            previous = current+1;
        },
    
        showCurrent: function(ev){
            console.log("showcurrent", ev);
            if(ev.target.innerText === current){
                return;
            }
            current = parseInt(ev.target.dataset.value,10);  
            moveImage(current, previous);
            previous = current-1    
        }
    }
})();

document.querySelector('.loader').addEventListener('animationend', () => {
    document.querySelector('.loader').remove();
    document.querySelector('.slider').style.display = "block";
    monkSlider.initialize();
});

document.querySelectorAll('.currentBtn').forEach(btn => {
    btn.addEventListener('click', (event) => {
        monkSlider.showCurrent(event);
    })
});

document.querySelector('.prev').addEventListener('click', () => {
    monkSlider.showPrevious();
});

document.querySelector('.next').addEventListener('click', () => {
    monkSlider.showNext();
});
