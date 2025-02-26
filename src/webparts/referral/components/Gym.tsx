import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Web } from "sp-pnp-js";
import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel, getFilteredRowModel, } from '@tanstack/react-table';
import './Style.css'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { DefaultButton, PrimaryButton, TextField, } from '@fluentui/react';
import { Panel, PanelType, } from "@fluentui/react/lib/Panel";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import Swal from "sweetalert2";

import moment from 'moment';
 

const Gym = (props:any) => {
 const [data, setData] = React.useState<any[]>([]);
 
  const [columnFilters, setColumnFilters] = React.useState<{ id: string; value: string }[]>([]);
  
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);
  const [Createdname,setCreatedname] = React.useState();
  const [Createddate,setCreateddate] = React.useState();
  const [Modifiedname,setModifiedname] = React.useState();
  const [Modifiedate,setModifieddate] = React.useState();
  const [selectedStatus, setSelectedStatus] =React.useState<string>('');
  

  const [formdata, setFormdata] = React.useState({
    Title: "",
    Email: "",
    PhoneNumber: "",
    Status: "",
    Response: "",
    CallSchedule: "",
    // Created: "",
    });
 
  const [editId, setEditId] = React.useState(null);
 


  const fetchApidata = async () => {
    try {
      const web = new Web("https://smalsusinfolabs.sharepoint.com/sites/F4S");
      const res = await web.lists
        .getByTitle("Referral")
        .items.select("Title","ID", "Email","PhoneNumber"," Status", "Response","Created",
   "CallSchedule","Author/Id","Author/Title","Editor/Id","Editor/Title"
         ).expand("Author,Editor")
        .getAll();
      setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 React.useEffect(() => {
    fetchApidata();
  }, []);

  console.log(props);


  

  
 



  

   const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          setSelectedStatus(e.target.value);
        };
      
       
        const filteredData = Array.isArray(data)
        ? selectedStatus
          ? data.filter((item) => item.Status === selectedStatus)
          : data
        : [];
      
  
         


  

 const columns=[
          
          {
            header:'Name',
            accessorKey:'Title'
          },
          {
            header:'Phone No',
            accessorKey:'PhoneNumber'
          },
          {
            header:'Email',
            accessorKey:'Email'
          },
          {
            header: 'Call Appointment',
            accessorKey:'CallSchedule',
            cell: (info:any) => {
              const rawDate = info.getValue();
              return rawDate ? moment(rawDate).format("DD/MM/YYYY hh:mm:ss A") : " ";
            },
           
          },
          {
            header: () => (
              <select
                
                className="form-select"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="">Select Status</option>
                <option value="New">New</option>
                <option value="Joined">Joined</option>
                <option value="Connected">Connected</option>
                <option value="Not-Interested">Not Interested</option>
                <option value="Follow-Up">Follow-Up</option>
              </select>
            ),
            accessorKey:'Status'
          },
          {
            header:'Response',
            accessorKey:'Response'
          },
          {
            header:'Created',
            accessorKey:'Created',
            cell: (info:any) => {
              const CDate = info.getValue();
              return CDate ? moment(CDate).format("DD/MM/YYYY ") : "N/A";
            },
          },

          {
            header: 'Actions',
              cell: ({ row }: any) => {
                const item = row.original; 
                return (
                  <td  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button
                        className="btn"
                        onClick={() => {
                            handleEdit(item);
                            setIsPanelOpen(true);;
                        }}
                      >
                        <FaRegEdit style={{ color: "green" }} />
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleDelete(item.Id)}
                      >
                        <MdDelete style={{ color: "red" }} />
                      </button>
                    </div>
                  </td>
                );
              },
          }
          
          
       ]

  const tabledata = useReactTable({
    data: filteredData,
    columns,
    state: {
       
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
   
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      // pagination: { pageIndex: 0, pageSize: 8 }, 
      sorting: [],
    },
  })


 


  const handleAddTask = async () => {
    setEditId(null);
    
    try {
      const phone =
      formdata.PhoneNumber && !isNaN(Number(formdata.PhoneNumber))
        ? parseInt(formdata.PhoneNumber)
        : null;
      
      const postData = {
        Title: formdata?.Title || "",
        Status:formdata?.Status || "",
        PhoneNumber:  phone,
        Email: formdata?.Email || "",
        Response: formdata?.Response || "",
        CallSchedule: formdata?. CallSchedule|| "",
        // Created: formdata?.Created || "",
        };
      const web = new Web("https://smalsusinfolabs.sharepoint.com/sites/F4S");
      let res = await web.lists.getById("A576144A-556F-4F37-960A-A4ED978EF524").items.add(postData);

      console.log("Added item response:", res);
     
      setFormdata({
        Title: "",
    Email: "",
    PhoneNumber: "",
    Status: "",
    Response: "",
    CallSchedule: "",
    // Created: "",
        
      });
      fetchApidata();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleSaveTask = async () => {
    try {
      if (editId !== null) {
        await updateDetails(editId);
        Swal.fire({
          text: "You have successfully updated items!",
          icon: "success",
        });
      }
       else {
        await handleAddTask();
        Swal.fire({
          text: "You have successfully added items!",
          icon: "success",
        });
      }
      setIsPanelOpen(false);
    } catch (error) {
      console.error("Error saving task:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while saving the task.",
        icon: "error",
      });
    }
    setIsPanelOpen(false);
  };

  const handleNewTask = () => {
   
    setFormdata({
        Title: "",
        Email: "",
        PhoneNumber: "",
        Status: "",
        Response: "",
        CallSchedule: "",
        // Created: "",
     
    
      
     
    });
    setEditId(null);
    setIsPanelOpen(true);
  };



  const handleEdit = (item: any) => {
    setEditId(item.Id);
    const selecteditem = item;
  
    setFormdata({
        Title: selecteditem?.Title || "",
        CallSchedule:moment(selecteditem?.CallSchedule).format("YYYY-MM-DD hh:mm:ss A")||"",
         Status:selecteditem?.Status||"",
        PhoneNumber: selecteditem?.PhoneNumber || "",
        Email: selecteditem?.Email || "",
        Response: selecteditem?.Response || "",
       
        // Created: selecteditem?.Created || "",
     
    });
  
    setCreatedname(selecteditem.Author?.Title || "");
    setCreateddate(selecteditem.Created || "");
    setModifiedname(selecteditem.Editor?.Title || "");
    setModifieddate(selecteditem.Modified || "");
  
   
  
   
  
    setIsPanelOpen(true);
    
  };
  


  const updateDetails = async (id: number) => {
   
   
    try {

      const phone =
      formdata.PhoneNumber && !isNaN(Number(formdata.PhoneNumber))
        ? parseInt(formdata.PhoneNumber)
        : null;
      
      const web = new Web("https://smalsusinfolabs.sharepoint.com/sites/F4S");
      await web.lists
        .getById("A576144A-556F-4F37-960A-A4ED978EF524")
        .items.getById(id)
        .update({
            Title: formdata?.Title || "",
            Status:formdata?.Status || "",
            PhoneNumber:  phone,
            Email: formdata?.Email || "",
            Response: formdata?.Response || "",
            CallSchedule: formdata?.CallSchedule|| "",
            // Created: formdata?.Created || "",
         
        });

      setIsPanelOpen(false);
      setEditId(null);

      fetchApidata();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };


  const closePanel = () => {
    
    setFormdata({
        Title: "",
        Email: "",
        PhoneNumber: "",
        Status: "",
        Response: "",
        CallSchedule: "",
        // Created: "",
    
    
      // Author:"",
      // Editor:"",
      // Modified:"",
      // Created:"",
     

    });

    setIsPanelOpen(false);
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure Delete Item",
      text: "You want to delete this data",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "delete",
    }).then(async (result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        try {
          const web = new Web("https://smalsusinfolabs.sharepoint.com/sites/F4S");
          await web.lists
            .getById('A576144A-556F-4F37-960A-A4ED978EF524')
            .items.getById(id)
            .delete()
            .then(() => {
              const remaindata = data.filter((item) => item.id != id);
              setData(remaindata);
              fetchApidata();
              Swal.fire({
                title: "Deleted!",
                text: "The item has been deleted successfully.",
                icon: "success",
              });
            });
        } catch (error) {
          console.log("data in not delete");

          Swal.fire({
            title: "Error!",
            text: "Something went wrong. The item could not be deleted.",
            icon: "error",
          });
        }
      }
    });
  };

  

  const onRenderFooterContent = React.useCallback(
    () => (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        {editId != null && (
          <div>
            <div>
              Created{" "}
              <span style={{ color: "skyblue", fontSize: "10px" }}>
                {Createddate ? moment(Createddate).format("DD/MM/YYYY") : "N/A"}
              </span>{" "}
              by{" "}
              <span style={{ color: "skyblue", fontSize: "10px" }}>
                {Createdname || "N/A"}
              </span>
            </div>
            <div>
              Last modified{" "}
              <span style={{ color: "skyblue", fontSize: "10px" }}>
                {Modifiedate ? moment(Modifiedate).format("DD MMM YYYY") : "N/A"}
              </span>{" "}
              by{" "}
              <span style={{ color: "skyblue", fontSize: "10px" }}>
                {Modifiedname || "N/A"}
              </span>
            </div>
          </div>
        )}
  
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {editId!=null && (
          <a 
            href={`https://smalsusinfolabs.sharepoint.com/sites/F4S/Lists/Referral/EditForm.aspx?ID=${editId}`} 
            style={{ textDecoration: "none", color: "skyblue", fontSize: "14px" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open out-of-the-box form
          </a>
          )}
          <PrimaryButton onClick={handleSaveTask}>Save</PrimaryButton>
          <DefaultButton onClick={() => closePanel()}>Cancel</DefaultButton>
        </div>
      </div>
    ),
    [
      handleSaveTask,
      closePanel,
      Createddate,
      Createdname,
      Modifiedate,
      Modifiedname,
    ]
  );
  
  
  
  



  const handleChange=(e:any)=>{
    const {name,value}=e.target;
    setFormdata(prevdata=>({
      ...prevdata,
      [name]:value,
     
    }))

   }









  return (
    <>
      <div className='bg'>
      <h1 className='text-center  pt-3 text-light' >Referral</h1>
       
        <div className="text-right mb-3 clearfix"
          style={{ marginTop: "-20px" }}>
          <button
            className="border-0 my-2  px-3 py-2 rounded-2 mx-3 pull-right  btn btn-primary"

            onClick={handleNewTask}
          >
            Add
          </button>
        </div>

        <div className='m-3 mb-3 bg-light'>

             <table className="table table-striped table-bordered table-hover bg-light ">
                        <thead>
                        {tabledata.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th key={header.id}>
          
                            {/* {header.column.id == 'Status'&&
                             <div>
                            { header.column.id == 'Status'&&flexRender(
                              header.column.columnDef.header,
                              header.getContext() 
                            )}
                            </div>
                              } */}
                           <div className='d-flex '>
                           <div>
                            {header.column.getCanFilter() && header.column.id !== 'Status' ?(
                                <input
                                  type="text"
                                  placeholder={` ${header.column.columnDef.header}`}
                                  value={(header.column.getFilterValue() as string) || ''}
                                  onChange={(e) =>
                                    header.column.setFilterValue(e.target.value)
                                  }
                                  className="form-control mt-1"
                                />
                              ):<div style={{marginRight:'15px'}}>
                            { header.column.id == 'Status'&&flexRender(
                              header.column.columnDef.header,
                              header.getContext() 
                            )}
                            </div>}
                            </div>
                          <div style={{alignItems: 'center',cursor: 'pointer',color: '#97999b', marginLeft: '-20px',}}
                            onClick={header.column.getToggleSortingHandler()}>
                           
                            { header.column.id !== 'Actions' &&header.column.id !== 'Status' ?header.column.getIsSorted() === 'asc' ? <FaAngleUp /> : <FaAngleDown />:''}
                            <br />
                            {header.column.id !== 'Actions' && header.column.id !== 'Status'? header.column.getIsSorted() === 'desc' ?  <FaAngleDown />:<FaAngleUp />:''}
                          </div>
                           </div>
          
                          
                        </th>
                        ))}
                      </tr>
                    ))}
                        </thead>
                        <tbody>
                            {tabledata.getRowModel().rows.map((row) => (
                          <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                              <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            ))}
                      </tr>
                    ))}
                        </tbody>
                      </table>
          
         </div>

         <div>
          <Panel
            isOpen={isPanelOpen}
            onDismiss={closePanel}
            headerText="Form Details"
            closeButtonAriaLabel="Close"
            onRenderFooterContent={onRenderFooterContent}
            isFooterAtBottom={true}
            type={PanelType.medium}
          >
            <div className="row">
              {/* First Name and Last Name */}
              <div className="col-lg-6">
                <div className="form-group m-2">
                  <h6> Name</h6>
                  <TextField
                    name="Title"
                    value={formdata?.Title || ""}
                    onChange={(e) => handleChange(e)}
                    autoComplete="off"
                    required
                    errorMessage={!formdata?.Title ? "Title  is required" : ""}
                  />
                </div>
              </div>
             

             
              
              <div className="col-lg-6">
                <div className="form-group m-2">
                  <h6>Email</h6>
                  <TextField
                    name="Email"
                    value={formdata?.Email || ""}
                    onChange={(e) => handleChange(e)}
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Phone Number and Qualification */}
              <div className="col-lg-6">
                <div className="form-group m-2">
                  <h6>Phone Number</h6>
                  <TextField
                   name="PhoneNumber"
                value={formdata?.PhoneNumber || ""}
              onChange={(e) => handleChange(e)}
             autoComplete="off"
       
             />

                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group m-2">
                  <h6>CallSchedule</h6>
                  <TextField
                    name="CallSchedule"
                       type="date"
                    value={moment(formdata?.CallSchedule).format("YYYY-MM-DD")}
                    onChange={(e,) => handleChange(e)}
                    autoComplete="off"
                  />
                </div>
              </div>
              
            
              <div className="col-lg-12">
                              <div className="form-group m-2">
                                 <label>Response</label>
                                  <textarea
                                  rows={4}
                                  className="form-control mt-2"
                                name='Response'
                                  value={formdata?.Response}
                                  onChange={handleChange}
                                   autoComplete='off'
                                  
                                   />
                              </div>
                           </div>

                    <div className="col-lg-12">
                              <div className="form-group m-2">
                                  <label>Status</label>
                                  <div className="stream-options mt-2">
                                  <label>
                                      <input
                                      type="radio"
                                      name="Status"
                                      value="New"
                                      className='mx-2'
                                      checked={formdata?.Status === "New"}
                                      onChange={handleChange}
                                      />
                                      <span>New</span>
                                  </label>
                                  <label>
                                      <input
                                      type="radio"
                                      name="Status"
                                      value="Connected"
                                      className='mx-2'
                                      checked={formdata?.Status === "Connected"}
                                      onChange={handleChange}
                                      />
                                      <span>Connected</span>
                                  </label>
                                  <label>
                                      <input
                                      type="radio"
                                      name="Status"
                                      value="Follow-Up"
                                      className='mx-2'
                                      checked={formdata?.Status === "Follow-Up"}
                                      onChange={handleChange}
                                      />
                                      <span>Follow-UP</span>
                                  </label>
                                  <label>
                                      <input
                                      type="radio"
                                      name="Status"
                                      value="Not Interested"
                                      className='mx-2'
                                      checked={formdata?.Status === "Not Interested"}
                                      onChange={handleChange}
                                      />
                                      <span>Not Interested</span>
                                  </label>
                                  <label>
                                      <input
                                      type="radio"
                                      name="Status"
                                      value="Joined"
                                      className='mx-2'
                                      checked={formdata?.Status === "Joined"}
                                      onChange={handleChange}
                                      />
                                      <span>Joined</span>
                                  </label>
                                  
                                  
                                  </div>
                              </div>
                              </div>

             
              
             
              

               
            </div>
          </Panel>
        </div>

      </div>

    </>
  )
}

export default Gym


