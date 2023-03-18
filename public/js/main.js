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

const renderCards = (result) => {
    let acum = ""
    result.map(element => {
        acum += `
            <div>
                <h3>Código: ${element.code}</h3>
                <h3>titulo: ${element.title}</h3>
                <h3>Descripción: ${element.description}</h3>
                <h3>Stock: ${element.stock}</h3>
            </div>
        `
    });
    return acum
}
const productListRender = async () => {
    try {
        const result = await ipcRenderer.invoke("producListReq")
        productListSection.innerHTML = renderCards(result)
    } catch (err) {
        console.log("err",err)
    }
}



productListRender()



const handleInputSearch = async (e)=> {
    const value = searchEngine.value
    const result = await ipcRenderer.invoke("findProductByTitle", value)
    productListSection.innerHTML = renderCards(result)
}

const searchEngine = document.getElementById("searchEngine")
searchEngine.addEventListener("input", handleInputSearch)