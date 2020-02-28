let matchNums = [];
let matches = [];
let inputs = $('.data');
let link = document.getElementById('download');
let QRindex = -1;
let teams, pos, file, url, loop;
let autoCycleNumber = 0;
let teleopCycleNumber = 0;
let cardData = {'teleop':{'ShotBallsData': [5], 'ScoredBallsData' : [5]}, 'auto':{'ShotBallsData': [5], 'ScoredBallsData' : [5]} };
let checkboxes = [false, false, false];
let climbPosition = "";
console.log(matches)
function loadAPI(){
    teams = []
    $('#info').attr('src', './img/loadingGIF.gif').css('display', 'initial');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.thebluealliance.com/api/v3/event/2019casj/matches/simple");
    xhr.setRequestHeader("X-TBA-Auth-Key", 'XL8fgNqovBJ2yo79NeRFMAWEFbyWiUvsHI8v3sDFDeRdQNx5fH4nepBbh4Ns19vL');
    xhr.onload = function(){
        let data = JSON.parse(this.responseText)
        console.log(data);
        data.forEach(match => {
            if(match.comp_level.substring(10) == 'qm'){
                teams.push(match.alliances.red.team_keys.concat(match.alliances.blue.team_keys))
            }
        })
        $('#matchNum').change();
        console.log(teams);
    }
    xhr.send();
}


function exportToCSV(filename) {
    if(filename == null){return;}
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < matches.length; i++) {
        csvFile += processRow(matches[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that sup     HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function assignDelete(){
    $('.delMatch').click((e)=>{
        let tr = $(e.currentTarget).parent();
        console.log(tr.index());
        matches.splice(tr.index());
        tr.remove()
    })
}

function assignEdit(){
    $('.dataCell').click((e)=>{
        $('#dataSave').attr('disabled', false);
        let newValue = prompt("new value");
        $(e.currentTarget).text(newValue);
    });
}

function save(){
    //[[scoutName, scoutNumber, matchNumber, teamNumber, initLine(Bool), cycle1AutoShot, cycle1AutoScored, cycle1Port..., autoPosition, cycle1TeleopShot, cycle1TeleopScored, cycle1Port..., teleopPosition, spinnerRotation, spinnerPosition, climb, comment] [match2]...]
    console.log('save')
    $('#dataSave').attr('disabled', true);
    for(let i in matches){
        let trs = $('#data tr');
        console.log(trs);
        let tr = $(trs[i]);
        console.log(tr);
        let tds = $(tr.children);
        console.log(tds);
        for(let f in matches[i]){
            let td = $(tds[f]);
            console.log(td);
            let val = td.text();
            console.log(val);
            matches[i][f] = val;
        }
    }
    
    console.log(matches);
}

function generateQR(index){
    let str = '';
    let matchNum = matches[QRindex][2]
    $('#matchName').text('Match ' + matchNum);
    $('#qrcode').empty();
    for(let i in matches[QRindex]){
        str += matches[QRindex][i] + ';';
    }
    var qrcode = new QRCode(document.getElementById('qrcode'), {
        text: str,
        width: Math.round($(window).width()/3),
        height: Math.round($(window).width()/3),
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

function changeQR(dir){
    if(QRindex+dir <= matches.length-1 && QRindex+dir >= 0){
        QRindex += dir
        generateQR();
    }
}

$('#form h3').click(function() {
    $(this).width($(this).next().width())
    $(this).next().slideToggle(500)
})

$('#form').submit((e)=>{ 
    console.log("sumbmitted");
    e.preventDefault();
    if(confirm("are you sure you want to submit?")){
        //[[scoutName, scoutNumber, matchNumber, teamNumber, initLine(Bool), cycle1AutoShot, cycle1AutoScored, cycle1Port..., autoPosition, cycle1TeleopShot, cycle1TeleopScored, cycle1Port..., teleopPosition, spinnerRotation, spinnerPosition, climb, comment] [match2]...]
        let match = [];
        let tr = $('<tr></tr>');
        matchNums.push(inputs[2].value);
        tr.append($('<td class="delMatch"><button class="btn btn-danger">&times;</button></td>'))
        for(let i in [...Array(4)]){
            match.push(inputs[i].value);
            tr.append($('<td></td>').text(inputs[i].value).addClass('dataCell'));
            $('#data tbody').append(tr);
            if(i == 2){
                inputs[i].value++;
            }
        }
        match.push($("#checkbox1").is(":checked"));
        tr.append($('<td></td>').text($("#checkbox1").is(":checked")).addClass('dataCell'));
        match.push($("#checkbox2").is(":checked"));
        tr.append($('<td></td>').text($("#checkbox2").is(":checked")).addClass('dataCell'));
        match.push($("#checkbox3").is(":checked"));
        tr.append($('<td></td>').text($("#checkbox3").is(":checked")).addClass('dataCell'));
        for(let m = 0; m < 3; m++){
            $(`#checkbox${m+1}`).prop("checked", false);
        }
        match.push(cardData.auto.ShotBallsData.reduce(function(a, b){
            return a + b; 
        }, 0));
        match.push(cardData.auto.ScoredBallsData.reduce(function(a, b){
            return a + b; 
        }, 0));
        match.push(cardData.teleop.ShotBallsData.reduce(function(a, b){
            return a + b; 
        }, 0));
        match.push(cardData.teleop.ScoredBallsData.reduce(function(a, b){
            return a + b; 
        }, 0));
        match.push((cardData.auto.ShotBallsData.length + cardData.teleop.ShotBallsData.length));
        match.push($("#primaryPosition").text());
        tr.append($('<td></td>').text($("#primaryPosition").text()).addClass('dataCell'));
        match.push($("#secondaryPosition").text());
        tr.append($('<td></td>').text($("#secondaryPosition").text()).addClass('dataCell'));
        match.push(climbPosition);
        tr.append($('<td></td>').text(climbPosition).addClass('dataCell'));
        match.push($('#comments').val())
        $('#comments').val('')
        matches.push(match);
        QRindex = matches.length-1;
        assignDelete();
        assignEdit();
    }
    $('#QRbutton').click();
});


$('#matchNum').change(function(){
    if(teams != null && pos != null){
        let match = parseInt($(this).val())-1
        let team = teams[match][pos]
        let teamNum = team.substring(3, team.length)
        $('#teamNum').val(teamNum);
    }
});

$('#apiSave').click(()=>{
    if($('#toogleAPI').is(':checked') && pos != $('#pos').val()){
        pos = $('#pos').val();
        loadAPI();
    }
});




function createSlider(state, scoreType, cycleNumber){
    console.log("#"  + state + scoreType + cycleNumber.toString());
    var handle = $( "#" + state + scoreType + cycleNumber + "-handle" );
    $( "#" + state + scoreType + cycleNumber.toString() ).slider({
      value:5,
      min: 0,
      max: 5,
      step: 1,
      create: function() {
        handle.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        console.log(cardData);
        handle.text( ui.value );
        cardData[state][`${scoreType}Data`][$(this).attr('id').match(/\d+/)[0]] = ui.value;
      }
    });

    // $(`shotBalls${autoCycleNumber}`).slider({
    //     formatter: function(value) {
    //         return value;
    //     }
    // });

    // var slider = new Slider(`#shotBalls${autoCycleNumber}`, {
    //     formatter: function(value) {
    //         console.log(value);
    //         return value;
    //     }
    // });
}

function createCard(state, container, cycleNumber){
    var currCycleNum = (state == "teleop")? teleopCycleNumber : autoCycleNumber;
    var cycleNum = cycleNumber.toString();
    if(state=="teleop"){
        cardData.teleop.ShotBallsData[teleopCycleNumber] = 5;
        cardData.teleop.ScoredBallsData[teleopCycleNumber] = 5;
    }else{
        cardData.auto.ShotBallsData[autoCycleNumber] = 5;
        cardData.auto.ScoredBallsData[autoCycleNumber] = 5;
    }
    $(container).append(`
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <div>
                <h6>Shot Balls</h6>
                <div id="${state}ShotBalls${cycleNum}" style="margin-bottom: 15px;">
                    <div id="${state}ShotBalls${cycleNum}-handle" class="ui-slider-handle sliderHandle" style="width: 1em;height: 1.6em;top: 50%;margin-top: -.8em;text-align: center;line-height: 1.6em;"></div>
                </div>
                <h6>Scored Balls</h6>
                <div id="${state}ScoredBalls${cycleNum}" style="margin-bottom: 15px;">
                    <div id="${state}ScoredBalls${cycleNum}-handle" class="ui-slider-handle sliderHandle" style="width: 1em;height: 1.6em;top: 50%;margin-top: -.8em;text-align: center;line-height: 1.6em;"></div>
                </div>               
            </div>
        </div>
    </div>`);


    createSlider("auto", "ShotBalls", currCycleNum);
    createSlider("auto", "ScoredBalls", currCycleNum);
    createSlider("teleop", "ShotBalls", currCycleNum);
    createSlider("teleop", "ScoredBalls", currCycleNum);
    if (state == "teleop") {
        teleopCycleNumber++;
    } else {
        autoCycleNumber++;
    }
    
    
}

window.onbeforeunload = (e)=>{

    localStorage.data = JSON.stringify(matches);
    // return false;
}

window.onload = ()=>{
    // $(".portButton").click(()=>{
    //     cardData.targetPortData[autoCycleNumber] = $( this ).attr('name');
    // })

    $("#autoCycleButton").click(()=>{
        createCard("auto", "#autoCardDiv", autoCycleNumber);
    });


    $("#teleopCycleButton").click(()=>{
        createCard("teleop", "#teleopCardDiv", teleopCycleNumber);
    });

    $("#primaryPostition").dropdown();
    $("#secondaryPosition").dropdown();

    createCard("teleop", "#teleopCardDiv", teleopCycleNumber);
    createCard("auto", "#autoCardDiv", autoCycleNumber);

    if(localStorage.getItem('data') != ''){
        matches = JSON.parse(localStorage.data);
        console.log('pull data');
        matches.forEach((match)=>{
            let tr = $('<tr></tr>');
            tr.append($('<td class="delMatch"><button class="btn btn-danger">&times;</button></td>'))
            match.forEach((value)=>{
                tr.append($('<td></td>').text(value).addClass('dataCell'));
            });
            $('#data tbody').append(tr);
        });
        $('.dataCell').click((e)=>{
            $('#dataSave').attr('disabled', false);
            let newValue = prompt("new value");
            $(e.currentTarget).text(newValue);
        });
        $('.delMatch').click((e)=>{
            let trNum = $(e.currentTarget).parent().index();
            matches.splice(trNum)
            $('#data tr:nth-child(' + trNum + 1 + ')')
        })
        $( "#speed" ).selectmenu()
    }
    assignDelete();
    assignEdit();
}

