
export default  function BosRandevuForm({subeler,selectedSubeId, setSelectedSubeId}) {
    if (!subeler || subeler.length === 0) {
        return <p>Şube bulunamadı.</p>;
      }

      const handleSube = (id) => {
        setSelectedSubeId(id)        
    }
    
    


    return(
        <>
        <div className="bg-emerald-200 p-2 rounded-lg">
            <ul>
                {subeler.map(e => (
                    <li onClick={() => handleSube(e.id)} className="m-2 bg-slate-100 p-4 rounded-lg hover:cursor-pointer active:bg-slate-700 active:text-white" key={e.id} value={e.id}>{e.sube_adi}</li>
                ))}
            </ul>

            
        </div>
        </>
    )
}