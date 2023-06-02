import React from "react";


function ShoesList(props) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Shoes</th>
                </tr>
            </thead>
            <tbody>
                {props.shoes.map(shoe => {
                    return (
                        <tr key={shoe.href}>
                            <td>{ shoe.closet_name }</td>
                            <td>{ shoe.bin }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ShoesList;
