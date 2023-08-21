import { useEffect, useState } from "react";

const Crud = () => {

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        city: "",
        salary: ""
    })
    const [record, setRecord] = useState([]);
    const [editid, setEditid] = useState("");
    const [isToggled, setIsToggled] = useState(false);
    const [isTableToggle, setisTableToggle] = useState(false);

    const onchange = (e) => {
        let { name, value } = e.target;
        setInput({
            ...input, [name]: value
        })
    }

    const onsubmit = () => {
        let { name, email, password, city, salary } = input;
        if (editid) {
            let ans = record.map((item) => {
                if (item.id == editid) {
                    return {
                        ...item,
                        name: name,
                        email: email,
                        password: password,
                        city: city,
                        salary: salary
                    }
                }
                return item;
            })
            setRecord(ans);
            setEditid("");
        } else {
            let obj = {
                id: Math.floor(Math.random() * 10000),
                name: name,
                email: email,
                password: password,
                city: city,
                salary: salary
            }
            let data = [...record, obj];
            setRecord(data);
            localStorage.setItem('crud', JSON.stringify(data));
        }
        setInput({
            name: "",
            email: "",
            password: "",
            city: "",
            salary: ""
        })
    }

    const ondelete = (id) => {
        let ans = record.filter((item) => {
            return item.id !== id;
        })
        setRecord(ans);
        localStorage.setItem('crud', JSON.stringify(ans));
        alert("Delete Record");
    }

    const onedit = (id) => {
        let ans = record.filter((item) => {
            return item.id === id;
        })
        setInput(ans[0]);
        setEditid(id);
    }

    useEffect(() => {
        let alldata = JSON.parse(localStorage.getItem('crud'));
        if (alldata == null) {
            setRecord([]);
        } else {
            setRecord(alldata);
        }
    }, [])


    const handleToggle = () => {
        setIsToggled(!isToggled);
    };
    const TableToggle = () => {
        setisTableToggle(!isTableToggle);
    };

    return (
        <center>
            <button style={{ background: "#282c3499", color: "white", width: "300px", height: "40px", borderRadius: "10px", border: "0", margin: "10px 0 0 0" }} onClick={() => handleToggle()}>Show Form</button>
            <div>
                {isToggled ?
                    (
                        <table style={{ background: "#282c3499", padding: "60px 50px", margin: "50px 0", borderRadius: "15px" }} id="formtable ">
                            <tbody>
                                <tr>
                                    <td style={{ fontSize: "20px", color: "white" }}>Name:-</td>
                                    <td><input style={{ width: "300px", height: "40px", borderRadius: "10px", border: "0", fontSize: "20px", outline: "none" }} type="text" name="name" value={input.name} onChange={onchange} /></td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: "20px", color: "white" }}>Email:-</td>
                                    <td><input style={{ width: "300px", height: "40px", margin: "10px 0", borderRadius: "10px", border: "0", fontSize: "20px", outline: "none" }} type="text" name="email" value={input.email} onChange={onchange} /></td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: "20px", color: "white" }}>Password:-</td>
                                    <td><input style={{ width: "300px", height: "40px", borderRadius: "10px", border: "0", fontSize: "20px", outline: "none" }} type="text" name="password" value={input.password} onChange={onchange} /></td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: "20px", color: "white" }}>City:-</td>
                                    <td><input style={{ width: "300px", height: "40px", margin: "10px 0", borderRadius: "10px", border: "0", fontSize: "20px", outline: "none" }} type="text" name="city" value={input.city} onChange={onchange} /></td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: "20px", color: "white" }}>Salary:-</td>
                                    <td><input style={{ width: "300px", height: "40px", borderRadius: "10px", border: "0", fontSize: "20px", outline: "none" }} type="text" name="salary" value={input.salary} onChange={onchange} /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <button style={{ background: "#282c3499", color: "white", width: "125px", height: "40px", borderRadius: "10px", border: "0", margin: "10px 0 0 0" }} onClick={() => TableToggle()}>Show Table</button>
                                    </td>
                                    <td>
                                        {
                                            (editid) ? (<button style={{ width: "300px", height: "40px", borderRadius: "10px", border: "0", margin: "10px 0 0 0 " }} onClick={() => onsubmit()}>Edit</button>)
                                                : (<button style={{ width: "300px", height: "40px", borderRadius: "10px", border: "0", margin: "10px 0 0 0" }} onClick={() => onsubmit()}>Submit</button>)

                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )
                    :
                    ('')
                }

            </div>
            <div>
                {isTableToggle && isToggled ?
                    (
                        <table border={1} >
                            <thead>
                                <tr style={{ backgroundColor: "#282c3499", border: "0" }}>
                                    <th style={{ width: "50px", height: "50px" }}>#</th>
                                    <th style={{ width: "" }}>ID</th>
                                    <th style={{ width: "" }}>STUDENT</th>
                                    <th style={{ width: "" }}>Email</th>
                                    <th style={{ width: "" }}>Password</th>
                                    <th style={{ width: "" }}>City</th>
                                    <th style={{ width: "" }}>Salary</th>
                                    <th style={{ width: "" }}>Actiev</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    record.map((item, index) => {
                                        const { id, name, email, password, city, salary } = item;
                                        if (index % 2 == 0) {
                                            return (
                                                <tr key={id} style={{ backgroundColor: "#282c3421", textAlign: "center" }}>
                                                    <td style={{ width: "100px", border: "0", height: "45px", fontSize: "18px" }}>{index + 1}</td>
                                                    <td style={{ width: "100px", border: "0", height: "40px", fontSize: "18px" }}>{id}</td>
                                                    <td style={{ width: "200px", border: "0", height: "40px", fontSize: "18px" }}>{name}</td>
                                                    <td style={{ width: "300px", border: "0", height: "40px", fontSize: "18px" }}>{email}</td>
                                                    <td style={{ width: "200px", border: "0", height: "40px", fontSize: "18px" }}>{password}</td>
                                                    <td style={{ width: "200px", border: "0", height: "40px", fontSize: "18px" }}>{city}</td>
                                                    <td style={{ width: "200px", border: "0", height: "40px", fontSize: "18px" }}>{salary}</td>
                                                    <td style={{ border: "0" }}>
                                                        <button style={{ backgroundColor: "#282c3499", color: "white", width: "40px", border: "1", height: "35px", fontSize: "20px", margin: "0 10px 0 15px" }} onClick={() => ondelete(id)}><i className="bi bi-x"></i></button>
                                                        <button style={{ backgroundColor: "#282c3499", color: "white", width: "40px", border: "1", height: "35px", fontSize: "20px", margin: "0 15px 0 10px" }} onClick={() => onedit(id)}><i className="bi bi-pencil"></i></button>
                                                    </td>
                                                </tr>
                                            )
                                        } else {
                                            return (
                                                <tr key={id} style={{ backgroundColor: "#00000030", textAlign: "center" }}>
                                                    <td style={{ width: "100px", border: "0", height: "45px", fontSize: "18px" }}>{index + 1}</td>
                                                    <td style={{ width: "100px", border: "0", height: "40px", fontSize: "18px" }}>{id}</td>
                                                    <td style={{ width: "200px", border: "0", height: "40px", fontSize: "18px" }}>{name}</td>
                                                    <td style={{ width: "300px", border: "0", height: "40px", fontSize: "18px" }}>{email}</td>
                                                    <td style={{ width: "200px", border: "0", height: "40px", fontSize: "18px" }}>{password}</td>
                                                    <td style={{ width: "200px", border: "0", height: "40px", fontSize: "18px" }}>{city}</td>
                                                    <td style={{ width: "200px", border: "0", height: "40px", fontSize: "18px" }}>{salary}</td>
                                                    <td style={{ border: "0" }}>
                                                        <button style={{ backgroundColor: "#282c3499", color: "white", width: "40px", border: "1", height: "35px", fontSize: "20px", margin: "0 10px 0 15px" }} onClick={() => ondelete(id)}><i className="bi bi-x"></i></button>
                                                        <button style={{ backgroundColor: "#282c3499", color: "white", width: "40px", border: "1", height: "35px", fontSize: "20px", margin: "0 15px 0 10px" }} onClick={() => onedit(id)}><i className="bi bi-pencil"></i></button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                    )
                    :
                    ("")
                }
            </div>

        </center>
    )
}
export default Crud;