import React from "react";


function HatsList(props) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Hats</th>
                </tr>
            </thead>
            <tbody>
                {props.hats.map(hat => {
                    return (
                        <tr key={hat.href}>
                            <td>{ hat.shelf_name }</td>
                            <td>{ hat.location }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default HatsList;
