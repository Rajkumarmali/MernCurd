import { useEffect, useState } from "react"

export default function Student() {

    const [students, setStudents] = useState([]);
    const [addStudentModel, setAddStudentModel] = useState(false);
    const [updateStuId, setUpdateStuId] = useState(null);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        const response = await fetch("http://localhost:3001/api/getStudent", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await response.json();
        setStudents(data);
        console.log(students);
    }

    const addStudent = async () => {
        setAddStudentModel(true)
    }

    const saveNewStudent = async (e) => {
        e.preventDefault();
        setAddStudentModel(false);
        const response = await fetch("http://localhost:3001/api/addStudent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ name, email, phone, address })
        })
        const data = await response.text();
        console.log(data);
        loadStudents();
    }

    const deleteStu = async (studentId) => {
        const response = await fetch(`http://localhost:3001/api/deleteStudent/${studentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        const data = await response.text();
        console.log(data);
        loadStudents();
    }

    const updateStudent = async (student) => {
        setUpdateStuId(student._id)
        setName(student.name)
        setEmail(student.email)
        setPhone(student.phone)
        setAddress(student.address)
    }

    const saveUpdateStu = async () => {
        const response = await fetch(`http://localhost:3001/api/updateStudent/${updateStuId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({ name, email, phone, address })
        })
        const data = await response.text();
        loadStudents();
        setUpdateStuId(null);
        setUpdateStuId()
        setName()
        setEmail()
        setPhone()
        setAddress()
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" onClick={addStudent}>Add Studnet</button>
            </div>
            {!addStudentModel && (
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>So.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((student, i) => (
                            <tr key={student._id}>
                                <td>{i + 1}</td>
                                <td>
                                    {student._id === updateStuId ? (
                                        <input
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    ) : (
                                        student.name
                                    )}
                                </td>

                                <td>
                                    {student._id === updateStuId ? (
                                        <input
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    ) : (
                                        student.email
                                    )}
                                </td>

                                <td>
                                    {student._id === updateStuId ? (
                                        <input
                                            className="form-control"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    ) : (
                                        student.phone
                                    )}
                                </td>

                                <td>
                                    {student._id === updateStuId ? (
                                        <input
                                            className="form-control"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    ) : (
                                        student.address
                                    )}
                                </td>
                                <td>
                                    {student._id === updateStuId ? (
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-success btn-sm" onClick={saveUpdateStu}>
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => updateStudent(student)}
                                            >
                                                Update
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteStu(student._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            )
            }

            {
                addStudentModel &&
                <div>
                    <form onSubmit={saveNewStudent}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            }
        </div>
    )
}
