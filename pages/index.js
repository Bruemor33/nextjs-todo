import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from 'react'

export default function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [todo, setTodo] = useState('')
  let changeHandler = (event) => {
    setTodo(event.target.value)
  }

  let addTodo = (event) => {
    setLoading(true)
    event.preventDefault()
    fetch(`/api/add?todo=${todo}`)
      .then(res => res.json())
      .then(data => {
        console.log('data', data)
        loadTodos()
      })
  }

  let removeTodo = (item) => {
    setLoading(true)
    fetch(`/api/remove?todo=${item}`)
      .then(res => res.json())
      .then(data => {
        console.log('data', data)
        loadTodos()
      })
  }

  let loadTodos = () => {
    console.log('Loading Todos...')
    fetch('/api/list')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }

  useEffect(() => {
    setLoading(true)
    loadTodos()
  }, [])

  if (!data) return 'Loading...'

  return (
    <div className={styles.container}>
      <Head>
        <title>A NextJS Todo App Tutorial</title>
        <meta name='description' content='Using create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <h1 className={styles.title}>
            Serverless TODO APP using <a href='https://blog.upstash.com/nextjs-todo'>Upstash and Vercel!</a>
          </h1>
          {
            loading ?
              <a href='#' className={styles.card}>
                <img src='/loader.gif' alt='Loading animation.' />
              </a>
            :
              <form className={styles.cardForm} onSubmit={addTodo}>
                <input
                  className={styles.cardInput}
                  type='text'
                  name='todo'
                  onChange={changeHandler}
                  placeholder='Enter your exciting TODO item!'
                />
              </form>
          }

          {data.map((item) => 
            <a
              href='#'
              onClick={() => removeTodo(item)}
              className={styles.card}
            >
              {item}
            </a>
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href='https://blog.upstash.com/nextjs-todo'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}<span className={styles.logo}>
            <Image src='/logo.png' alt='Upstash Logo' width={87} height={25} />
          </span>
        </a>
      </footer>
    </div>
  )
}
