
import './App.css';
import { useState, useEffect } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs';

const API = "http://localhost:5001"

function App() {
  
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(false);

  //Load todos on page load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const res = await fetch(API + "/todos")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
        

      setLoading(false);

      setTodo(res);
    };

    loadData()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    }

    await fetch(API + "/todos",{
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodo((prevState) => [...prevState, todo]);

    setTitle("");
    setTime("");
  };

  const handleDelete = async (id) => {
    await fetch(API + "/todos/" + id,{
      method: "DELETE"
    });

    setTodo((prevState) => prevState.filter((todo) => todo.id !==id))
  }

  const handleEdit = async (todo) => {

    todo.done = !todo.done;
    const data = await fetch(API + "/todos/" + todo.id,{
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodo((prevState) => 
    prevState.map((t) => (t.id === data.id ? (t = data ) : t))
    );
  }

  if(loading){
    return <p>Carregando Tasks...</p>
  }

  return (
    <div className="App">
      <div className='todo-header'>
        <h1>Tasks Todo</h1>
      </div>
      <div className='form-todo'>
        <h2>Insira sua próxima tarefa:</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor='title'>O quê você vai fazer?</label>
            <input 
              type='text' 
              name="title" 
              placeholder='Título da tarefa' 
              onChange={(e) => setTitle(e.target.value)} 
              value={title || ''} 
              required 
            />
          </div>
          <div className='form-control'>
            <label htmlFor='time'>Duração:</label>
            <input 
              type='text' 
              name="time" 
              placeholder='Tempo estimado (em horas)' 
              onChange={(e) => setTime(e.target.value)} 
              value={time || ''} 
              required 
            />
          </div>
          <input type="submit" value="Criar tarefa" />
        </form>
      </div>
      <div className='list-todo'>
        <h2>Lista de Tarefas:</h2>
        {todo.length === 0 && <p>Não há tarefas registradas!</p>}
        {todo.map((item) => (
          <div className='todo' key={item.id}>
            <h3 className={item.done ? "todo-done" : ""}>{item.title}</h3>
            <p>Duração: {item.time}</p>
            <div>
              <span onClick={() => handleEdit(item)}>
                {!item.done ? <BsBookmarkCheck/> : <BsBookmarkCheckFill/>}
              </span>
              <BsTrash onClick={() => handleDelete(item.id)}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
