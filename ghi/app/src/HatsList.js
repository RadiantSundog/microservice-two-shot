import React from "react";


function HatsList(props) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Hats</th>
                    <th>Details</th>
                    <th>Fabric</th>
                    <th>Id</th>
                    <th>Closet name</th>
                </tr>
            </thead>
            <tbody>
                {props.hats.map(hat => {
                    return (
                        <tr key={hat.id}>
                            <td>{ hat.style_name }</td>
                            <td>{ hat.color }</td>
                            <td>{ hat.fabric }</td>
                            <td>{ hat.id }</td>
                            <td>{ hat.closet_name }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default HatsList;
