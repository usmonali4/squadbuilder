import React, { useState, useEffect } from 'react';
import axios from "../api/axiosConfig";
import '../index.css';
import { useNavigate } from 'react-router-dom';

const Room = ({ onLogout }) => {

  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [isCreate, setIsCreate] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      axios.get(`/users/${storedUsername}/rooms`)
        .then(response => {
          console.log(response.data);
          if(response.data){
            setRooms(response.data);
          }
        })
        .catch(error => {
          console.error('There was an error fetching the room data!', error);
        });
    } else {
      navigate('/squadbuilder'); 
    }
  }, []);

  const handleSubmitJoin = async (e) => {
    e.preventDefault();
    if (roomId.trim() === '') {
      alert("Please fill in room id");
      return;
    }
    try {
      console.log(username, roomId);
      await axios.post(`/rooms/join/${roomId}?username=${username}`);
      
      navigate(`/squadbuilder/room/${roomId}`)
    } catch (error) {
      alert("Joining failed");
      setRoomId('');
      console.log(error);
    }
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    console.log("here is the username: ", username);
    if (roomName.trim() === '' || roomDescription.trim() === '') {
      alert("Please fill in both room name and description");
      return;
    }
    try {
      const response = await axios.post(`/rooms/create/${username}`, {
        name: roomName,
        description: roomDescription,
      });
      setIsCreate(false);
      setRoomName('');
      setRoomDescription('');
      
      const roomId = response.data;
      navigate(`/squadbuilder/room/${roomId}`);
    } catch (error) {
      alert("Creating room failed");
      console.log(error);
    }
  };

  const handleOnClickRoom = (roomId) => {
    console.log(roomId);
    navigate(`/squadbuilder/room/${roomId}`)
  }

  

  return (
    <div >
      <button style={{fontSize: '25px'}} className="logout-button" onClick={onLogout}>Logout</button>
      <div>
        <button style={{fontSize: '25px'}} className='create-room' onClick={() => setIsCreate(true)}>Create Room</button>
        <button style={{fontSize: '25px'}} onClick={() => {
          setIsJoin(!isJoin);
          setIsCreate(false);
        }}>
          Join Room
        </button>
      </div>
      {isJoin && (
        <form onSubmit={handleSubmitJoin}>
          <div>
            <label style={{fontSize: '25px'}}>Room Id:</label>
            <input style={{fontSize: '25px'}}
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              required
            />
          </div>
          <button style={{fontSize: '25px'}} type="submit">Join</button>
        </form>
      )}
      <div className='rooms'>
          <p style={{fontSize: '25px', color: ''}}>Current Rooms: </p>
        <ul>
            {rooms.map((room, index) => (
                <li key={index}>
                    <button style={{ backgroundColor: 'transparent', textAlign: 'center', color: 'black', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} onClick={() => handleOnClickRoom(room)}>
                        room {index}
                    </button>
                </li>
            ))}
          </ul>
        </div>
      {isCreate && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsCreate(false)}>&times;</span>
            <form onSubmit={handleSubmitCreate}>
              <div>
                <label>Room Name:</label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Room Description:</label>
                <input
                  type="text"
                  value={roomDescription}
                  onChange={(e) => setRoomDescription(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      )}
              


    </div>
    
  );
};

export default Room;
