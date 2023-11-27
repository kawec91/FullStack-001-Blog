import { useEffect, useState } from "react"
import readTextFromServer from "../../readTextFromServer";
import readJsonFromServer from "../../readJsonFromServer";
import BlogCard from "../BlogCard/BlogCard";
import classes from './Blog.module.css';

export default function Blog() {
    const [blogs, setBlogs] = useState();

    function loadBlogs() {
        readJsonFromServer(`http://localhost:8801/blog/abrufen/${localStorage.getItem("uid")}`, (r) => {
            console.log(r)
            if (r === 0) {
                setBlogs(<p>Kein blogs im DataBank</p>);
            } else {
                let myList = [];
                r.forEach((blog) => {
                    myList.push(<BlogCard titel={blog.Titel} text={blog.Text} id={blog.id} key={`blog-id-${blog.id}`} />);
                })
                setBlogs(myList);
            }

        });
    }

    function saveBlog() {
        let titel = document.getElementsByTagName("input")[0].value;
        let text = document.getElementsByTagName("input")[1].value;
        readTextFromServer(`http://localhost:8801/blog/erstellen/${localStorage.getItem("uid")}/${titel}/${text}`, (r) => { console.log(r) })
        loadBlogs();
        document.getElementsByTagName("input")[0].value = "";
        document.getElementsByTagName("input")[1].value = "";
    }

    useEffect(() => {
        loadBlogs();
    }, []);
    return (
        <div>
            <div className={classes.titelAndFormDiv}>
                <h3>New Blog</h3>
                <div className={classes.formDiv}>
                    <input type="text" placeholder="Titel" />
                    <input type="text" placeholder="Text" />
                    <button onClick={saveBlog}>Speichern</button>
                </div>
            </div>
            <hr />
            {blogs}
        </div>
    )
}