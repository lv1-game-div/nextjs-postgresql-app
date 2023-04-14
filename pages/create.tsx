import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトル"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="本文"
            rows={8}
            value={content}
          />
          <input className='create' disabled={!content || !title} type="submit" value="作成" />
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }

        .create {
          position: relative;
          display: flex;
          justify-content: space-around;
          align-items: center;
          max-width: 240px;
          padding: 10px 25px;
          color: #000
          transition: 0.3s ease-in-out;
          font-weight: 600;
          background: #6bb6ff;
          border-radius: 50px;
          border: 0.2rem solid #543618;
          box-shadow: 0.2rem 0.2rem 0px 0.1rem #4f96f6;
        }
        .create:hover {
          transform: translate3d(0.2rem, 0.2rem, 0);
          box-shadow: none;
          opacity: 1;
          transition: all 0.2s;
        }
        .create::after {
          content: '';
          width: 5px;
          height: 5px;
          border-top: 3px solid #543618;
          border-right: 3px solid #543618;
          transform: rotate(45deg) translateY(-50%);
          position: absolute;
          top: 50%;
          right: 20px;
          border-radius: 1px;
          transition: 0.3s ease-in-out;
        }
        @keyframes light {
          from {opacity: 0; left: 0%;}
          50% {opacity: 1;}
          to {opacity: 0;left: 100%;}
        }
      `}</style>
    </Layout>
  );
};

export default Draft;