-- From Firebase to SQL
INSERT INTO
    profile (id, email, name, description, fb, ig)
VALUES
    ('tMzu51IOUpf3j4z13DdtJ6iMOUg2', 'adawomenitc@gmail.com', 'Ada Women', '¡Hola! Ada Women es un grupo enfocado en crear un ambiente de motivación, aprendizaje y crecimiento para las mujeres en carreras STEM.', 'adawomenitc', 'adawomenitc'),
    ('75Sm1S0fimXm9AzVsW7hbZqtbWH3', 'ericjardon@hotmail.com', 'Eric Chao', '¡Hola! Viuteca se trata de organizar y hacer más accesibles los videos de grupos estudiantiles del Tec!', 'ericjardonchao', '7.00012');

INSERT INTO
    profile (id, email, name, fb, ig)
VALUES
    ('txZMPyk7OvNQ9mBvonSM8QLbQ8l1', 'ccm.code.it@gmail.com', 'Code.It', 'codeitc', 'codeitc');

INSERT INTO
    profile(id, email, name)
VALUES
    ('2VOScr6BFjPPBAyyIGohD6ffqGk2', 'demianks2000@gmail.com', 'Dems'),
    ('CRpnK3uQvXef91Y0q7Uax8eYViy1', 'gina10111@hotmail.com', 'Cool People');

INSERT INTO
    profile(id, email, name, description)
VALUES
    ('xOtUFDGEcKQCePtyCL1h34nKWnk2', 'geebproject@gmail.com', 'GEEB', '¡Hola! Esta es la página de videos de GEEB. Un consejo: para añadir tu propia foto de perfil, entra a gravatar.com y crea una cuenta con el mismo correo electrónico de Viuteca.');

INSERT INTO
    video (
        profile_id,
        title,
        dt,
        description,
        duration_hrs,
        duration_mins,
        duration_secs,
        likes,
        img_url,
        video_url
    )
VALUES
();

INSERT INTO
    tag (profile_id, title)
VALUES
    ();