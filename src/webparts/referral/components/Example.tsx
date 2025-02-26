// import * as React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {  Web} from "sp-pnp-js";
// import { useReactTable,flexRender,getCoreRowModel,getSortedRowModel, getFilteredRowModel,} from '@tanstack/react-table';
// import './Style.css'
// import * as moment from 'moment'; 
// import { FaRegEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { Panel, PanelType} from '@fluentui/react/lib/Panel';
// import { FaAngleUp } from "react-icons/fa";
// import { FaAngleDown } from "react-icons/fa";
// import Swal from "sweetalert2";


// const Tenstack = () => {

  
//   const testurl="https://smalsusinfolabs.sharepoint.com/sites/IITIQ";
//   const teststudentid="74B7FEF6-020F-4F64-8DE4-338FBAEF2687";
  

//    const [data,setData]=React.useState<any[]>([]);
//    const [globalFilter, setGlobalFilter] = React.useState<string>('');
//    const [columnFilters, setColumnFilters] = React.useState<{ id: string; value: string }[]>([]);

//     const [isopenmodal,setIsopenmodal]=React.useState(false);
//        const [formdata,setFormdata]=React.useState({
//            Title:"",
//            Email:"",
//            PhoneNumber:"",
//            CallSchedule:"",
//            Status:"",
//            Response:"",
//            // Author:""
//        });
   
//        const [editindex,setEditindex]=React.useState(null);
//        const [selectedStatus, setSelectedStatus] = React.useState('New');

//     const fetchApidata = async () => {
//            try {
//                const web = new Web(testurl);
//                const res = await web.lists.getById(teststudentid).items.select("Id","Title","Email","PhoneNumber","CallSchedule","Status","Response","Author/Title","Created").expand("Author").get();
//                setData(res);  
//            } catch (error) {
//                console.error("Error fetching data:", error);
//            }
//        };
       
//        React.useEffect(() => {
//            fetchApidata();
//        }, []); 
   
//        console.log("total data",data);

//        const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedStatus(e.target.value);
//       };
    
//       // Filter Data Based on Selected Status
//       const filteredData = selectedStatus
//         ? data.filter((item) => item.Status === selectedStatus)
//         : data;

       
//        const columns=[
          
//           {
//             header:'Title',
//             accessorKey:'Title'
//           },
//           {
//             header:'PhoneNumber',
//             accessorKey:'PhoneNumber'
//           },
//           {
//             header:'Email',
//             accessorKey:'Email'
//           },
//           {
//             header:'Call Appointment',
//             accessorKey:'CallSchedule',
//             cell: (info:any) => {
//               const rawDate = info.getValue();
//               return rawDate ? moment(rawDate).format("DD/MM/YYYY hh:mm:ss A") : "N/A";
//             },
           
//           },
//           {
//             header: () => (
//               <select
                
//                 className="form-select"
//                 value={selectedStatus}
//                 onChange={handleStatusChange}
//               >
//                 <option value="">Select Status</option>
//                 <option value="New">New</option>
//                 <option value="Joined">Joined</option>
//                 <option value="Connected">Connected</option>
//                 <option value="Not-Interested">Not Interested</option>
//                 <option value="Follow-Up">Follow-Up</option>
//               </select>
//             ),
//             accessorKey:'Status'
//           },
//           {
//             header:'Response',
//             accessorKey:'Response'
//           },
//           {
//             header:'Created',
//             accessorKey:'Created',
//             cell: (info:any) => {
//               const CDate = info.getValue();
//               return CDate ? moment(CDate).format("DD/MM/YYYY ") : "N/A";
//             },
//           },

//           {
//             header: 'Actions',
//               cell: ({ row }: any) => {
//                 const item = row.original; // Access the row's original data
//                 return (
//                   <td  >
//                     <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                       <button
//                         className="btn"
//                         onClick={() => {
//                           handleedit(item);
//                           openModal();
//                         }}
//                       >
//                         <FaRegEdit style={{ color: "green" }} />
//                       </button>
//                       <button
//                         className="btn"
//                         onClick={() => handledelete(item.Id)}
//                       >
//                         <MdDelete style={{ color: "red" }} />
//                       </button>
//                     </div>
//                   </td>
//                 );
//               },
//           }
          
          
//        ]

//        const tabledata=useReactTable({
//         data:filteredData,
//         columns,
//         state: {
//           globalFilter,
//       columnFilters,
//         },
//         onColumnFiltersChange: setColumnFilters,
//         onGlobalFilterChange: setGlobalFilter,
//         getCoreRowModel:getCoreRowModel(),
//         // getPaginationRowModel: getPaginationRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//         initialState: {
//           // pagination: { pageIndex: 0, pageSize: 8 }, 
//           sorting: [],
//         },
//       })



//        const handledelete=async(id:number)=>{
//         Swal.fire({
//           title: "Are you sure Delete Item",
//           text: "You want to delete this data",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonColor: "#3085d6",
//           cancelButtonColor: "#d33",
//           confirmButtonText: "delete",
         
//         }).then(async (result) => {
//           if (result.isConfirmed) {
//               try {
//                 const web=new Web(testurl);
//                 await web.lists.getById(teststudentid).items.getById(id).delete().
//                 then(()=>{
                  
//                   const remaindata=data.filter(item=>item.id!=id)
//                   setData(remaindata);
//                   fetchApidata();
//                   Swal.fire({
//                     title: "Deleted!",
//                     text: "The item has been deleted successfully.",
//                     icon: "success",
//                   });
//                 })
//               } catch (error) {
//                 console.log("data in not delete");
                
//                 Swal.fire({
//                   title: "Error!",
//                   text: "Something went wrong. The item could not be deleted.",
//                   icon: "error",
//                 });
//               }
//             }
//           });
//            }
      
//            const openModal=()=>setIsopenmodal(true);
//            const closeModal=()=>setIsopenmodal(false);
      
      
//            const handleChange=(e:any)=>{
//               const {name,value}=e.target;
//               setFormdata(prevdata=>({
//                 ...prevdata,
//                 [name]:value,
               
//               }))
        
//              }
      
           
//            const handleedit=(item:any)=>{
//               setEditindex(item.Id);
//               const selecteditem=item;
//               setFormdata({
//                   Title:selecteditem?.Title||"",
//                   Email:selecteditem?.Email||"",
//                   PhoneNumber:selecteditem?.PhoneNumber||"",
//                   CallSchedule:moment(selecteditem?.CallSchedule).format("YYYY-MM-DD hh:mm:ss A")||"",
//                   Status:selecteditem?.Status||"",
//                   Response:selecteditem?.Response||"",
//                   // Author:selecteditem.Author.Title||""
//               })
//               setIsopenmodal(true);
             
        
//              }
      
//              const handlesumbit=async(e:any)=>{
//               e.preventDefault();
             
              
        
//               try {
//                 let web=new Web(testurl);
//                if(editindex!==null)
//                {
//                 await web.lists.getById(teststudentid).items.getById(editindex).update({
//                   CallSchedule:formdata?.CallSchedule,
//                   Status:formdata?.Status,
//                   Response:formdata?.Response,
//                 }).then((res)=>{
//                     const updatedata=[...data];
//                     updatedata[editindex]={...updatedata[editindex],...formdata}
//                     setData(updatedata);
        
//                   setIsopenmodal(false)
//                   setEditindex(null);
//                 setFormdata({
//                       Title:"",
//                   Email:"",
//                   PhoneNumber:"",
//                   CallSchedule:"",
//                   Status:"",
//                   Response:"",
//                   // Author:""
//                 })
//                 Swal.fire({
//                   title: "Success!",
//                   text: "The record has been updated successfully.",
//                   icon: "success",
//                 });
//                 })
//                 fetchApidata();
        
//                }
                
//               }
//                catch (error) {
//                 console.log(error);
//                 Swal.fire({
//                   title: "Error!",
//                   text: "An error occurred while updating the record.",
//                   icon: "error",
//                 });
                
//               }
        
//              }

       

//   return (
//     <>
//         <div className='bg'>
//         <h1 className='text-center  pt-3 text-light' >Referral Page</h1>
//         <div className="space">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search across all columns..."
//             value={globalFilter || ''}
//             onChange={(e) => setGlobalFilter(e.target.value)}
//           />
//         </div>
//         <div className='m-3 mb-3 bg-light'>
        
//             <table className="table table-striped table-bordered table-hover bg-light ">
//               <thead>
//               {tabledata.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id}>

//                   {/* {header.column.id == 'Status'&&
//                    <div>
//                   { header.column.id == 'Status'&&flexRender(
//                     header.column.columnDef.header,
//                     header.getContext() 
//                   )}
//                   </div>
//                     } */}
//                  <div className='d-flex '>
//                  <div>
//                   {header.column.getCanFilter() && header.column.id !== 'Status' ?(
//                       <input
//                         type="text"
//                         placeholder={` ${header.column.columnDef.header}`}
//                         value={(header.column.getFilterValue() as string) || ''}
//                         onChange={(e) =>
//                           header.column.setFilterValue(e.target.value)
//                         }
//                         className="form-control mt-1"
//                       />
//                     ):<div style={{marginRight:'15px'}}>
//                   { header.column.id == 'Status'&&flexRender(
//                     header.column.columnDef.header,
//                     header.getContext() 
//                   )}
//                   </div>}
//                   </div>
//                 <div style={{alignItems: 'center',cursor: 'pointer',color: '#97999b', marginLeft: '-20px',}}
//                   onClick={header.column.getToggleSortingHandler()}>
                 
//                   { header.column.id !== 'Actions' &&header.column.id !== 'Status' ?header.column.getIsSorted() === 'asc' ? <FaAngleUp /> : <FaAngleDown />:''}
//                   <br />
//                   {header.column.id !== 'Actions' && header.column.id !== 'Status'? header.column.getIsSorted() === 'desc' ?  <FaAngleDown />:<FaAngleUp />:''}
//                 </div>
//                  </div>

                
//               </th>
//               ))}
//             </tr>
//           ))}
//               </thead>
//               <tbody>
//                   {tabledata.getRowModel().rows.map((row) => (
//                 <tr key={row.id}>
//                   {row.getVisibleCells().map((cell) => (
//                     <td key={cell.id}>
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </td>
//                   ))}
//             </tr>
//           ))}
//               </tbody>
//             </table>


//             {/* <div className="pagination">
//         <button
//         className='btn btn-primary '
//           onClick={() => tabledata.previousPage()}
//           disabled={!tabledata.getCanPreviousPage()}
//         >
//           Previous
//         </button>
//         <span style={{marginTop:"8px"}}>
//           Page {tabledata.getState().pagination.pageIndex + 1} of{' '}
//           {tabledata.getPageCount()}
//         </span>
//         <button
//         className='btn btn-primary '
//           onClick={() => tabledata.nextPage()}
//           disabled={!tabledata.getCanNextPage()}
//         >
//           Next
//         </button>
//       </div> */}
//         </div>


             

//         <div>
//             {
//               isopenmodal&&(
//                 <Panel  isOpen={isopenmodal} onDismiss={closeModal} type={PanelType.medium}>
//                   <div className='form-label'>{editindex==null?<h5 >Form Details</h5> :<h5 >Form Details</h5>}</div>
//                   <form onSubmit={handlesumbit}>
//                           <div className="row">
//                               <div className="col-lg-6">
//                                   <div className="form-group m-2">
//                                       <label >Title</label>
//                                       <input
//                                       type="text"
//                                       className="form-control mt-2"
//                                       name='Title'
//                                       value={formdata?.Title}
//                                       onChange={handleChange}
//                                       autoComplete='off'
//                                       disabled
//                                       />
//                                   </div>
//                               </div>
//                               <div className="col-lg-6">
//                                   <div className="form-group m-2">
//                               <label >Email</label>
//                               <input
//                                   type="text"
//                                   className="form-control mt-2"
//                                   name='Email'
//                                   value={formdata?.Email}
//                                   onChange={handleChange}
//                                   autoComplete='off'
//                                   disabled
//                               />
//                               </div>
//                               </div>
//                               <div className="col-lg-6">
//                                   <div className="form-group m-2">
//                               <label >Phone Number</label>
//                               <input
//                                   type="text"
//                                   className="form-control mt-2"
//                                   name='PhoneNumber'
//                                   value={formdata?.PhoneNumber}
//                                   onChange={handleChange}
//                                   autoComplete='off'
//                                   disabled
                              
//                               />
//                               </div>
//                               </div>
                              
//                               <div className="col-lg-6">
//                               <div className="form-group m-2">
//                                   <label >Call Schedule</label>
//                                   <input
//                                       type="date"
//                                       className="form-control mt-2"
//                                       name='CallSchedule'
//                                       value={moment(formdata?.CallSchedule).format("YYYY-MM-DD")}
//                                       onChange={handleChange}
//                                       autoComplete='off'
//                                   />
//                                   </div>
//                               </div>
                          
                              
                             
//                               <div className="col-lg-12">
//                               <div className="form-group m-2">
//                                   <label>Response</label>
//                                   <textarea
//                                   rows={4}
//                                   className="form-control mt-2"
//                                   name='Response'
//                                   value={formdata?.Response}
//                                   onChange={handleChange}
//                                   autoComplete='off'
                                  
//                                   />
//                               </div>
//                               </div>
                          
      
                              
//                               <div className="col-lg-12">
//                               <div className="form-group m-2">
//                                   <label>Status</label>
//                                   <div className="stream-options mt-2">
//                                   <label>
//                                       <input
//                                       type="radio"
//                                       name="Status"
//                                       value="New"
//                                       className='mx-2'
//                                       checked={formdata?.Status === "New"}
//                                       onChange={handleChange}
//                                       />
//                                       <span>New</span>
//                                   </label>
//                                   <label>
//                                       <input
//                                       type="radio"
//                                       name="Status"
//                                       value="Connected"
//                                       className='mx-2'
//                                       checked={formdata?.Status === "Connected"}
//                                       onChange={handleChange}
//                                       />
//                                       <span>Connected</span>
//                                   </label>
//                                   <label>
//                                       <input
//                                       type="radio"
//                                       name="Status"
//                                       value="Follow-Up"
//                                       className='mx-2'
//                                       checked={formdata?.Status === "Follow-Up"}
//                                       onChange={handleChange}
//                                       />
//                                       <span>Follow-UP</span>
//                                   </label>
//                                   <label>
//                                       <input
//                                       type="radio"
//                                       name="Status"
//                                       value="Not Interested"
//                                       className='mx-2'
//                                       checked={formdata?.Status === "Not Interested"}
//                                       onChange={handleChange}
//                                       />
//                                       <span>Not Interested</span>
//                                   </label>
//                                   <label>
//                                       <input
//                                       type="radio"
//                                       name="Status"
//                                       value="Joined"
//                                       className='mx-2'
//                                       checked={formdata?.Status === "Joined"}
//                                       onChange={handleChange}
//                                       />
//                                       <span>Joined</span>
//                                   </label>
                                  
                                  
//                                   </div>
//                               </div>
//                               </div>
                              
//                           <div className='text-end'>
//                               <button
//                               type="button"
//                               className="btn btn-danger"
//                               onClick={closeModal}
//                               >
//                               Close
//                               </button>
//                           {editindex==null? <button type="submit" className="btn btn-primary m-3">
//                               Save 
//                               </button>: <button type="submit" className="btn btn-primary m-3">
//                               Update 
//                               </button>}
//                           </div>
//                           </div>
      
//                   </form>   
//                 </Panel>
//               )
//                   }
//           </div>
          
//     </div>
        
//     </>
//   )
// }

// export default Tenstack