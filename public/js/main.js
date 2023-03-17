const submitButton = document.getElementById("submitButton")
const { ipcRenderer } = require("electron")

const handleSubmit = (e) => {
    e.preventDefault()

    const code = document.getElementById("code").value
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const stock = document.getElementById("stock").value

    if (!code || !title || !description || !stock) {
        return alert("Error: faltan datos")
    }

    const newProduct = {
        code,
        title,
        description,
        stock: parseInt(stock)
    }
    ipcRenderer.send("newProduct", newProduct)
}

submitButton.addEventListener("click", handleSubmit)

const productListSection = document.getElementById("productList")

const productListRender = async () => {
    try {
        const result = await ipcRenderer.invoke("producListReq")
        console.log(result)
    } catch (err) {
        console.log("err",err)
    }
}



productListRender()