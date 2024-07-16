import React, { useState } from 'react';

const LeadStatusForm = () => {
  const [leadId, setLeadId] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('leadId', leadId);
    formData.append('newStatus', status);

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.text();
      setMessage(result);
    } catch (error) {
      setMessage('Error updating lead status.');
    }
  };

  return (
    
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#331B63' }}>
    <div className="card text-center" style={{ width: '30rem' }}>
      <div className="card-body">
        <h1 className="card-title text-secondary">Actualizar Estado del Lead</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="leadId" className="form-label">
              Lead ID:
              <input
                type="text"
                className="form-control"
                id="leadId"
                value={leadId}
                onChange={(e) => setLeadId(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Estado:
              <select
                className="form-select"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Seleccione un estado</option>
                <option value="Contactado">Contactado</option>
                <option value="Esperando respuesta">Esperando respuesta</option>
                <option value="En llamada">En llamada</option>
                <option value="Win">Win</option>
                <option value="Lose">Lose</option>
              </select>
            </label>
          </div>
          <button type="submit" className="btn btn-dark">
            Actualizar Estado
          </button>
          {message && <p className="mt-3">{message}</p>}
        </form>
      </div>
    </div>
  </div>
  );
};

export default LeadStatusForm;


