export default function Form({ register, handler, registerHandler, obj, cancel, deleteProduct, updateProduct }) {
    return (
        <form>
            <input type='text' value={obj.name} onChange={handler} name='name' placeholder="Nome" className="form-control" required />
            <input type='text' value={obj.brand} onChange={handler} name='brand' placeholder="Marca" className="form-control" required />


            {
                register ? <input type='button' value="Cadastrar" className="btn btn-primary" onClick={registerHandler} />
                    : <div>
                        <input type='button' value="Alterar" onClick={() => { updateProduct(obj.id) }} className="btn btn-warning" />
                        <input type='button' value="Remover" onClick={() => { deleteProduct(obj.id) }} className="btn btn-danger" />
                        <input type='button' value="Cancelar" onClick={cancel} className="btn btn-secondary" />
                    </div>
            }



        </form>
    )
}