import React from 'react';
import MetaTags from 'react-meta-tags';
export default function DocumentMeta({title, description}){

    // const setTitle = title => {
    //     const el = document.querySelector('title');
    //     el.innerText = `${el.text} | ${title}`;
    //   };
    
    // const setDescription = desc => {
    //     const el = document.querySelector("meta[name='description']");
    //     el.setAttribute('content',desc)
    //   }

    return(
        <div className="wrapper">
          <MetaTags>
            <title>{title}</title>
            <meta id="meta-description" name="description" content={description} />
            <meta id="og-title" property="og:title" content={title} />
          </MetaTags>
        </div>
    )
}