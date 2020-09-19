function fetchFC(FCID){


	qData = {
  	pretty:1,
    extended:1,
    data:"FCM"  
  }

	$.ajax({
  	url:"https://xivapi.com/freecompany/" + FCID,
    data:qData,
    success:function(data){
		console.log(data)
    	drawFC(data); 
    }
  
  })


}


function drawFC(data){
  var FC = data.FreeCompany;
  var FCM = data.FreeCompanyMembers;
  var FCcrest0 = "<img class='Crest' src='" + FC.Crest[0] + "'></img>";
  var FCcrest1 = "<img class='Crest' src='" + FC.Crest[1] + "'></img>";
  var FCcrest2 = "<img class='Crest' src='" + FC.Crest[2] + "'></img>";
  var FCcrest = FCcrest0+FCcrest1+FCcrest2;
  
  $("#FCcrest").html(FCcrest);
	$("#FCname").html(FC.Name + "  [" + FC.Tag + "]");
  $("#FCslogan").html(FC.Slogan);
  
  $.each(FCM,function(i,v){
  	//for testing

    if(i < 200){
      var c = 0;
      var delay = i * 200;
      setTimeout(function(){
      
      

        qData = {
          pretty:1,
          data:"CJ"  
       }

        $.ajax({
          url:"https://xivapi.com/character/" + v.ID,
          async:true,
		  data:qData,
          success:function(mdata){
            console.log("Data");
            console.log(mdata);
            
            var highestClass = 0;
            $.each(mdata.Character.ClassJobs, function(ind,val){
              //console.log(highestClass);
              if(val.Level > highestClass){                	
                highestClass = val.Level;
              }              
            })
            
            if(highestClass > 70){
            	var highestClassExpac = "SHB";
            }else if(highestClass > 60 && highestClass <= 70){
            	var highestClassExpac = "SB";
         	}else if(highestClass > 50 && highestClass <= 60){
            	var highestClassExpac = "HW";
            }else{
            	var highestClassExpac = "ARR";
            }
			
			var fRank = v.Rank.replace(/\s/g, '');
           
		   if(!$("#"+fRank).length){
			   $("#container").append("<div id='" + fRank + "' class='members'><div class='rankTitle'>" + v.Rank + "</div></div>");
		   }
		   
           $("#" + fRank).append("<div class='charCard " + highestClassExpac + "'  id='"+ v.ID +"' data-sort='"+ v.ID +"' ><div class='front'><img class='portrait' src='" + mdata.Character.Portrait + "'></img><p class='charName'>" + mdata.Character.Name + "</p></div><div class='back'>BACK</div></div>");
		   $("#"+v.ID).flip();
          },
          error:function(error){
           console.log(error);
          }
        })    

      },delay);

  }
  })

$("#loadingCover").hide();

}

fetchFC("9234631035923204343");

function toggleDisplay(e){
	if($("." + e).css("display") == "inline-block"){
		$("." + e).css("display","none");
	}else{
		$("." + e).css("display","inline-block");
	}
}