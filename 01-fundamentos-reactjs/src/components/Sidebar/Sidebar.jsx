import { Avatar } from '../Avatar/Avatar'
import styles from './Sidebar.module.css'

import { PencilLine } from '@phosphor-icons/react'

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img
                className={styles.cover}
                src="https://images.unsplash.com/photo-1569317002804-ab77bcf1bce4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVtb24lMjBzbGF5ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=50"
                alt=""
            />

            <div className={styles.profile}>
                <Avatar src="https://github.com/iago-monteirog.png" />
                <strong>Iago Garcia</strong>
                <span>Web Developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={20} />
                    Editar seu perfil
                </a>
            </footer>
        </aside>
    )
}