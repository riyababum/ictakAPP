/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./BmList.css"
import "bootstrap/dist/css/bootstrap.min.css"

import $ from 'jquery';
 
//    There is a error in this portion from js:10 to js:47 (so please dubug before use) {Main problem is with add and save button}, I think it's a small problem.


// $(document).on("ready", function(){
// 	$('[data-toggle="tooltip"]').tooltip();
// 	var actions = $("table td:last-child").html();
// 	// Append table with add row form on add new button click
//     $(".add-new").on("click", function(){
// 		$(this).attr("disabled", "disabled");
// 		var index = $("table tbody tr:last-child").index();
//         var row = '<tr>' +
//             '<td><input type="text" className="form-control" name="name" id="name"></td>' +
//             '<td><input type="text" className="form-control" name="department" id="department"></td>' +
//             '<td><input type="text" className="form-control" name="phone" id="phone"></td>' +
// 			'<td>' + actions + '</td>' +
//         '</tr>';
//     	$("table").append(row);		
// 		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
//         $('[data-toggle="tooltip"]').tooltip();
//     });
// 	// Add row on add button click
// 	$(document).on("click", ".add", function(){
// 		var empty = false;
// 		var input = $(this).parents("tr").find('input[type="text"]');
//         input.each(function(){
// 			if(!$(this).val()){
// 				$(this).addClass("error");
// 				empty = true;
// 			} else{
//                 $(this).removeClass("error");
//             }
// 		});
// 		$(this).parents("tr").find(".error").first().on("focus");
// 		if(!empty){
// 			input.each(function(){
// 				$(this).parent("td").html($(this).val());
// 			});			
// 			$(this).parents("tr").find(".add, .edit").toggle();
// 			$(".add-new").removeAttr("disabled");
// 		}		
//     });
	// Edit row on edit button click
	$(document).on("click", ".edit", function(){		
        $(this).parents("tr").find("td:not(:last-child)").each(function(){
			$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
		});		
		$(this).parents("tr").find(".add, .edit").toggle();
		$(".add-new").attr("disabled", "disabled");
    });
	// Delete row on delete button click
	$(document).on("click", ".delete", function(){
        $(this).parents("tr").remove();
		$(".add-new").removeAttr("disabled");
    });
// });


function BmList(props) {



    return (
        <div className='bmlist'>

            
        <div>
           <p id="bmheading">Batch Managers</p>
<div className="container-lg">
    <div className="table-responsive">
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-8"><p id="subheading">Batch Managers <b id="subheading">Details</b></p></div>
                    <div className="col-sm-4">
                        <button type="button" className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button>
                    </div>
                </div>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Batch</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td></td>
                        <td>(171) 555-2222</td>
                        <td>
                            <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons">&#xE03B;</i></a>
                            <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                            <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>Peter Parker</td>
                        <td></td>
                        <td>(313) 555-5735</td>
                        <td>
                            <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons">&#xE03B;</i></a>
                            <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                            <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>Fran Wilson</td>
                        <td></td>
                        <td>(503) 555-9931</td>
                        <td>
                            <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons">&#xE03B;</i></a>
                            <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                            <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>      
                </tbody>
            </table>
        </div>
    </div>
</div>     
       
       </div>
       </div>
    );
}

export default BmList;