export default function Table({ products, select }) {
    return (
        <div class="table-responsive">
            <table className="table table-light table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Marca</th>
                        <th>Selecionar</th>

                    </tr>
                </thead>

                <tbody>
                    {products.map((obj, index) => (
                        <tr key={index}>
                            <td>{obj.id}</td>
                            <td>{obj.name}</td>
                            <td>{obj.brand}</td>
                            <td><input type="button" onClick={() => { select(obj.id) }} className="btn btn-secondary" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}