import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom';
const Home = ({ setid }) => {
  const [posts, setpost] = useState([]);
  const [category, setCatagory] = useState()

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category1 = queryParams.get('cat')
    setCatagory(category1);
  }, [location]);

  useEffect(() => {
    const fetchdata = async () => {
      const url = `http://localhost:8000/post/?cat=${category}`;
      if (category == null) { const url = `http://localhost:8000/post` }
      // const url=`http://localhost:8000/post`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
        , credentials: 'include'
      })
      const data = await response.json()
      console.log(data);
      setpost(data)
    }
    fetchdata();
  }, [category])

  const moveTo = (id) => {
    console.log(id)
    setid(id);
    window.location.href = `/single/${id}`
  }
  // const posts = [
  // {
  //   id: 1,
  //   title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //   desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //   img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  // },
  // {
  //   id: 2,
  //   title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //   desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //   img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  // },
  // {
  //   id: 3,
  //   title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //   desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //   img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  // },
  // {
  //   id: 4,
  //   title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //   desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //   img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  // },
  // {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   }
  // ];
  return (
    <>
      <Navbar />
      <div className='home'>
        <div className='blogs'>
          {posts.map((post) => {
            return (
              <div key={post.id} className='post'>
                <div className='image'><Link to=''>
                  <img src={post.img} alt={post.title} /></Link></div>
                <div className='r-side'>
                  <h2>{post.title}</h2>
                  <p>
                    {post.description.split(' ').slice(0, 40).join(' ')}{post.description.split(' ').length > 40 ? '...' : ''}
                  </p>
                  <button onClick={() => moveTo(post.id)}>Read more</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
