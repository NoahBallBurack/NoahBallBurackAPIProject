var text="";

function addFavorite() {
    if(text===""){
        text+=$("#favoriteType").val() + $("#favoriteName").val();
    }else{
        text+=","+ $("#favoriteType").val() + $("#favoriteName").val();
    }


    var str=$("#favoriteType").val();
    var betterStr=str.charAt(0).toUpperCase()+str.slice(1);
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    td1.innerHTML=betterStr;
    td1.setAttribute("class", "left");
    td2.innerHTML=$("#favoriteName").val();
    td2.setAttribute("class", "right");
    document.getElementById("favoriteThings").appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    document.getElementById("yourInputs").style.display="block";
}

function search(){
    if(text===""){
        $("#result").html("Please add at least one of your favorite things before we make a suggestion!");
    }else {
        var type = $("#typeDesired").val();
        var limit = $("#limit").val();
        if (type === "all") {
            var theURL = "https://tastedive.com/api/similar?k=335130-HighScho-23A0T2Q6&&q=" + text + "&&limit=" + limit;
            $.ajax({
                url: theURL,
                dataType: 'jsonp',
                success: processResults
            });
        } else {
            var theOtherURL = "https://tastedive.com/api/similar?k=335130-HighScho-23A0T2Q6&&q=" + text + "&&type=" + type + "&&limit=" + limit;
            $.ajax({
                url: theOtherURL,
                dataType: 'jsonp',
                success: processResults
            });
        }
    }
}


function processResults(data) {
   console.log(data);

   var numberOfResults=data.Similar.Results.length;
   if(numberOfResults==0){
       $("#result").html("We don't have any suggestions for you 😞 Try changing what you are searching for or adding more of your favorite things.")
   }else {
       if (numberOfResults==1) {
           $("#result").html("Our Suggestion: " + data.Similar.Results[0].Name);
       }else{
            var text="Our Suggestions: " + data.Similar.Results[0].Name;
            for(var i=1;i<numberOfResults;i++){
                text+=", " + data.Similar.Results[i].Name;
            }
            $("#result").html(text);
       }
   }
}