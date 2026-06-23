function sendToVivatok(asw, nme, qid, scr) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://vivatok.com/my/ajax", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    console.log(jsonResponse);
                } catch (error) {
                    console.warn("Response is not JSON:", xhr.responseText);
                }
            } else {
                console.error("Error:", xhr.status, xhr.statusText);
            }
        }
    };

    var params = new URLSearchParams({
        action: "answer",
        selected: asw,
        name: nme,
        quizid: qid,
        score: scr
    });

    xhr.send(params.toString());
}
