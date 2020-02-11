let matchNums = [];
let matches = [];
let inputs = $('.data');
let link = document.getElementById('download');
let QRindex = -1;
let teams, pos, file, url, loop;
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
            // Browsers that support HTML5 download attribute
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
    e.preventDefault();
    if(confirm("are you sure you want to submit?")){
        let match = [];
        let tr = $('<tr></tr>');
        matchNums.push(inputs[2].value);
        tr.append($('<td class="delMatch"><button class="btn btn-danger">&times;</button></td>'))
        for(let i in [...Array(21)]){
            match.push(inputs[i].value);
            tr.append($('<td></td>').text(inputs[i].value).addClass('dataCell'));
            $('#data tbody').append(tr);
            if(i == 2){
                inputs[i].value++;
            }
            if(i>3 && i<20){
                inputs[i].value = '0';
            }
        }
        match.push($('#comments').val())
        $('#comments').val('')
        matches.push(match);
        QRindex = matches.length-1;
        assignDelete();
        assignEdit();
    }
    console.log('submit');
    $('#QRbutton').click();
});

$('.plus').click((e)=>{
    let input = $($($($($(e.currentTarget).parent()).parent()).children()[1]).children()[0]);
    if(input.val()<parseInt(input.attr('max'))){
        input.val(parseInt(input.val())+1);
    }
});

$('.minus').click((e)=>{
    let input = $($($($($(e.currentTarget).parent()).parent()).children()[1]).children()[0]);
    if(input.val()>parseInt(input.attr('min'))){
        input.val(parseInt(input.val())-1);
    }
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

window.onbeforeunload = (e)=>{
    localStorage.data = JSON.stringify(matches);
}

window.onload = ()=>{
    console.log('load');
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
    }
    assignDelete();
    assignEdit();
}
