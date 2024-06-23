
let timer
let my_json
//הגדרת מערך אוביקטים לשמות השחקנים
let players_names =[];

window.onload = function () {

    switch (document.querySelector("body").id) {
        case "p_body":
            players_main();
            break;

        case "g_body":
            game_main();
            break;
    }

}
//אתחול עמוד שחקנים
function players_main() {

    //מניעת שליחת הטופס
    const forms = document.querySelectorAll(".form")
    for (f of forms) {
        f.onsubmit = function (e) {
            e.preventDefault();
        }
    }

    const input = document.querySelectorAll(".player")
    for (p of input) {
        p.onchange = change_color

    }
    const bottons = document.querySelectorAll(".submit")
    for (v of bottons) {
        v.onclick = before_play
       

    }

    //שמירת הנתןנים בJSON


    // הוספת קישור למעבר לעמוד הבא
    const btn1 = document.querySelector("#btn1")
    btn1.onclick = () => {
        arr_names()
        const link = document.getElementById("link")
        link.href = "game/game.html"
    }
}


//אתחול עמוד משחק
function game_main() {

    const data=localStorage.getItem("players");
    if(data)
    {
        players_names = JSON.parse(data);
    }
    

    //הזרקת נתןני המשתמש לדף השני - המשחק בעצמו
    let b = 1
    new_players_list = players_names.forEach(function (player) {
        let name1 = document.createElement("h1")
        let points1 = document.createElement("h2")
        let points2 = document.createElement("h2")
        name1.innerHTML = "-" + player.name
        //הכנסת קלס לכל נקודה ע"מ שיהיה אפשר להוסיף נקודות
        points2.classList = `change${b++}`
        points1.innerHTML = ":כמות הנקודות שצברת הוא"
        points2.innerHTML = parseInt(player.points)
        player_list = document.querySelector("#players_list")
        player_list.append(name1)
        player_list.append(points1)
        player_list.append(points2)
    })
    //תפיסת כפתורי השחקנים
    const btn_p1 = document.querySelector("#btn_p1")
    const btn_p2 = document.querySelector("#btn_p2")
    const btn_p3 = document.querySelector("#btn_p3")
    //הכנסת השמות לכפתורים
    btn_p1.innerHTML=players_names[0].name;
    btn_p2.innerHTML=players_names[1].name;
    btn_p3.innerHTML=players_names[2].name;


    //תפיסת הנקודות 
    let po_p1 = parseInt(document.querySelector(".change1").innerHTML)
    let po_p2 = parseInt(document.querySelector(".change2").innerHTML)
    let po_p3 = parseInt(document.querySelector(".change3").innerHTML)

    btn_p1.onclick = () => {
        add(1)
        print(1)
    }
    btn_p2.onclick = () => {
        add(2)
        print(2)
    }
    btn_p3.onclick = () => {
        add(3)
        print(3)
    }
    //מערך תמונות 1
    let pictures1 = ["1.JPG", "2.JPG", "3.JPG", "4.JPG",
        "5.JPG", "6.JPG", "7.JPG"]
    //מערך תמונות 2
    let pictures2 = ["8.JPG", "9.JPG", "10.JPG", "11.JPG",
        "12.JPG", "13.JPG", "14.JPG"]


    const btn2 = document.querySelector("#btn2")
    const btn3 = document.querySelector("#btn3")

    // במערך הראשון הכנסת התמונות כלא נראות
    for (let i = 0; i < pictures1.length; i++) {

        let new_img = document.createElement("img");
        new_img.src = "images/" + pictures1[i];
        new_img.classList = "close_img1"
        document.querySelector("#picture1").append(new_img)
    }
    // במערך השני הכנסת התמונות כלא נראות
    for (let i = 0; i < pictures2.length; i++) {

        let new_img = document.createElement("img");
        new_img.src = "images/" + pictures2[i];
        new_img.classList = "close_img2"
        document.querySelector("#picture2").append(new_img)
    }
    let arr1 = document.querySelectorAll(".close_img1")
    let arr2 = document.querySelectorAll(".close_img2")

    //מציג רק תמונה אחת בכל פעם
    next_picture(arr1, 0)
    init()

    let i = 1
    let j = 0
    let l = -0
    let k = 0
    btn2.onclick = () => {
        next_picture(arr1, i++)
        last_picture(arr2, l++)
        init()
    }
    //בלחיצה על הכפתור הטימר יפסק
    btn3.onclick = () => {
        next_picture(arr2, k++)
        last_picture(arr1, j++)
        clearInterval(timer)
        timer_d.innerHTML = ""
    }

    //הדפסת הנקודות על המסך
function print(ind) {
    switch (ind) {
        case 1:
            po_p1 = (po_p1 + 10)
            po_p1 = document.querySelector(".change1").innerHTML = po_p1
            break;
        case 2:
            po_p2 = (po_p2 + 10)
            po_p2 = document.querySelector(".change2").innerHTML = po_p2
            break;
        case 3:
            po_p3 = (po_p3 + 10)
            po_p3 = document.querySelector(".change3").innerHTML = po_p3
            break;

    }

}

}

//שינוי צבע לשאלה מה שמך
function change_color() {
    let p1 = this.closest(".none")
    p1.style.color = "white"

}
//הכנסת מס הנקודות בתחילת המשחק
function before_play() {
    const new_p = document.createElement("h1") 
    new_p.innerHTML = "!בהצלחה"
    let parent = this.closest(".div_p")
    parent.append(new_p)
}

//שמירת שמות השחקנים
function arr_names() {

    const n1 = document.querySelector("#p1").value;
    const n2 = document.querySelector("#p2").value;
    const n3 = document.querySelector("#p3").value;


    //שמות ונקודות לכל שחקן

    const name1 = {
        index: 1,
        name: n1,
        points: 0
    };
    const name2 = {
        index: 2,
        name: n2,
        points: 0
    };
    const name3 = {
        index: 3,
        name: n3,
        points: 0
    };
    players_names.unshift(name1);
    players_names.push(name2);
    players_names.push(name3);
    my_json = JSON.stringify(players_names);
    localStorage.setItem("players", my_json);
}

//הוספת נקודות לפי הלחיצה
function add(ind) {
    players_names = players_names.map(function (p) {
        if (p.index == ind) {
            p.points += 10;
        }
        return p
    }

    )

}
//הסתרת תמונות
function next_picture(arr, j) {
    arr[j].classList = "open_img"
    arr[j].onmouseover = () => {
        let name1 = document.createElement("h1")
        name1.innerHTML = "עוד קצת מאמץ ותצליחו"
        name1.classList = "mouse_sentence"
        timer_d.append(name1)
    }
}
function last_picture(arr, j) {
    arr[j].classList = "close_img1"
}

//טימר

function init() {

    let index = 60;
    const timer_d = document.querySelector("#timer_d")
    timer = setInterval(function () {
        timer_d.innerHTML = index

        if (index == 0) {
            clearInterval(timer)
        }
        index--;
    }, 1000)
}







