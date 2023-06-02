import React, { useEffect, useState } from 'react';

function ShoeForm() {
  const [bins, setBins] = useState([])
  const [formData, setFormData] = useState({
    model_name: '',
    manufacturer: '',
    color: '',
    picture_url: '',
    bin: '',
    import_href: '',
  })

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/bins/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setBins(data.bins);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:8080/api/shoes/';

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      setFormData({
        model_name: '',
        manufacturer: '',
        color: '',
        picture_url: '',
        bin: '',
        import_href: '',
      });
    }
  }

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value
    });
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new shoe</h1>
          <form onSubmit={handleSubmit} id="create-shoe-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Model name" required type="text" name="model_name" id="model_name" className="form-control" />
              <label htmlFor="name">Model name</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
              <label htmlFor="manufacturer">Manufacturer</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="color" required type="text" name="color" id="color" className="form-control" />
              <label htmlFor="color">Color</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Picture_URL" required type="Url" name="picture_url" id="picture_url" className="form-control" />
              <label htmlFor="picture_url">Picture URL</label>
            </div>

            <div className="mb-3">
              <select onChange={handleFormChange} required name="bin" id="bin" className="form-select">
                <option value="">Choose a bin</option>
                {bins.map(bin => {
                  return (
                    <option key={bin.id} value={bin.id}>{bin.closet_name}</option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ShoeForm;
