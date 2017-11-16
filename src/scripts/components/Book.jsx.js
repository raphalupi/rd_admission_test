import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import classnames from 'classnames';

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
    },

    bookInfoWrapper: {
        display: 'flex',
        flexDirection: 'row',
    }
});

const classes = {
    wrapper: classnames(
        css(styles.wrapper)
    ),

    bookInfoWrapper: classnames(
        css(styles.bookInfoWrapper)
    ),
};

const Book = ({
    bookInfo,
}) => {
    console.log(bookInfo);
    /*
    allowAnonLogging:false
    authors:[
        "Constance Kamii"
    ]
    canonicalVolumeLink:"https://books.google.com/books/about/A_crian%C3%A7a_e_o_n%C3%BAmero_implica%C3%A7%C3%B6es_edu.html?hl=&id=swZpxVpIIi4C"
    contentVersion:"0.0.1.0.preview.1"
    description:"A autora apresenta uma análise fundamentada na teoria de Piaget sobre as relações da criança com o número. Nesse livro estão colocadas algumas das questões relacionadas à aquisição e ao uso do conceito de número pelas crianças de 4 a 7 anos."
    imageLinks:{
        smallThumbnail: "http://books.google.com/books/content?id=swZpxVpII…=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        thumbnail: "http://books.google.com/books/content?id=swZpxVpII…=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    }
    infoLink:"http://books.google.com.br/books?id=swZpxVpIIi4C&dq=a&hl=&as_pt=BOOKS&source=gbs_api"
    maturityRating:"NOT_MATURE"
    previewLink:"http://books.google.com.br/books?id=swZpxVpIIi4C&printsec=frontcover&dq=a&hl=&as_pt=BOOKS&cd=2&source=gbs_api"
    publishedDate:"1992"
    publisher:"Papirus Editora"
    readingModes:{
        text: false,
        image: true
    }
    title:"A criança e o número: implicaçöes educacionais da teoria de Piaget para a atuação junto a escolares de 4 a 6 anos"
    */
    return (
        <div className={classes.wrapper}>
            <div>
                <a href={bookInfo.infoLink} rel="noreferrer noopener" target="_blank" className={classes.bookTitleLink}>
                    {bookInfo.title}
                </a>
            </div>
            <div className={classes.bookInfoWrapper}>
            </div>
        </div>
    );
};

Book.propTypes = {
    bookInfo: PropTypes.object.isRequired,
    onFavoriteToggle: PropTypes.func.isRequired,
};

export default Book;
