const submitButton = document.getElementById("submitButton")
const { ipcRenderer } = require("electron")
let productDetail = document.getElementsByClassName("productDetail")

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

//Mas detalles del producto
const renderProductDetail = async (code) => {
    const result = await ipcRenderer.invoke("productDetail", code)
    productListSection.innerHTML = `
        <div>
            <h3>Código: ${result.code}</h3>
            <h3>titulo: ${result.title}</h3><input id="updateTitleValue"><button ref="${result.code}" id="updateTitle">Actualizar</button>
            <h3>Descripción: ${result.description}</h3><input id="updateDescriptionValue"><button ref="${result.code}" id="updateDescription">Actualizar</button>
            <h3>Stock: ${result.stock}</h3><input id="updateStockValue"><button ref="${result.code}" id="updateStock">Actualizar</button>
        </div>
    `
}
const productDetailButtonEvent = () => {
    productDetail = document.querySelectorAll(".productDetail")
    if (productDetail.length > 0) {
        productDetail.forEach(el => {
            el.addEventListener("click", async (e) => {
                await renderProductDetail(e.target.id)
                const updateTitle = document.getElementById("updateTitle")
                updateTitle.addEventListener("click", async (e)=> {
                    try {
                        const updateTitleValue = document.getElementById("updateTitleValue").value
                        const productCode = e.target.attributes.ref.value
                        const result = await ipcRenderer.invoke("updateProduct", productCode, "title", updateTitleValue)
                        renderProductDetail(result.code)
                    } catch (err) {
                        console.log(err)
                    }
                })
            })
        })
    }
}


const renderCards = (result) => {
    let acum = ""
    result.map(element => {
        acum += `
            <div>
                <h3>Código: ${element.code}</h3>
                <h3>titulo: ${element.title}</h3>
                <h3>Descripción: ${element.description}</h3>
                <h3>Stock: ${element.stock}</h3>
                <button id="${element.code}" class="productDetail">Más detalles</button>
            </div>
        `
    });
    return acum
}
const productListRender = async () => {
    try {
        const result = await ipcRenderer.invoke("producListReq")
        productListSection.innerHTML = renderCards(result)
        productDetailButtonEvent()
    } catch (err) {
        console.log("err", err)
    }
}



productListRender()



const handleInputSearch = async (e) => {
    const value = searchEngine.value
    const result = await ipcRenderer.invoke("findProductByTitle", value)
    productListSection.innerHTML = renderCards(result)
    productDetailButtonEvent()
}

const searchEngine = document.getElementById("searchEngine")
searchEngine.addEventListener("input", handleInputSearch)

