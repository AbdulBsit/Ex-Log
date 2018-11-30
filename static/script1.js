function getBase64(file) {
    console.log("i m in")
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        document.querySelector('#hidden').value = reader.result;
        console.log(reader.result);
        return reader.result;
    };
    reader.onerror = function (error) {
        console.log("Error ", error);
    };
}

function encode() {
    var file = document.querySelector('#files > div > input[type="file"]').files[0]
    console.log(file)
    getBase64(file);
}
