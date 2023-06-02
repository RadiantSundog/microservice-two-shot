import React from "react";



function ShoesList(props) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Shoes</th>
                    <th>Manufacturer</th>
                    <th>Color</th>
                    <th>Bin</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {props.shoes.map(shoe => {
                    return (
                        <tr key={shoe.id}>
                            <td>{ shoe.model_name }</td>
                            <td>{ shoe.manufacturer }</td>
                            <td>{ shoe.color }</td>
                            <td>{ shoe.closet_name }</td>
                            <td>{ shoe.picture_url }</td>
                            <td><button onClick={() => this.delete(shoe.id)} type="button" class="btn btn-danger">Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ShoesList
