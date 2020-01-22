--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.stores DROP CONSTRAINT stores_pkey;
ALTER TABLE ONLY public.hangouts DROP CONSTRAINT hangouts_pkey;
ALTER TABLE ONLY public."hangoutAttendees" DROP CONSTRAINT "hangoutAttendees_pkey";
ALTER TABLE ONLY public.game DROP CONSTRAINT game_pkey;
ALTER TABLE ONLY public.events DROP CONSTRAINT events_pkey;
ALTER TABLE ONLY public."eventAttendees" DROP CONSTRAINT "eventAttendees_pkey";
ALTER TABLE public.users ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.stores ALTER COLUMN "storeId" DROP DEFAULT;
ALTER TABLE public.hangouts ALTER COLUMN "hangoutId" DROP DEFAULT;
ALTER TABLE public.game ALTER COLUMN "gameId" DROP DEFAULT;
ALTER TABLE public.events ALTER COLUMN "eventId" DROP DEFAULT;
DROP SEQUENCE public."users_userId_seq";
DROP TABLE public.users;
DROP SEQUENCE public."stores_storeId_seq";
DROP TABLE public.stores;
DROP SEQUENCE public."hangouts_hangoutId_seq";
DROP TABLE public.hangouts;
DROP TABLE public."hangoutAttendees";
DROP SEQUENCE public."game_gameId_seq";
DROP TABLE public.game;
DROP SEQUENCE public."events_eventId_seq";
DROP TABLE public.events;
DROP TABLE public."eventAttendees";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: eventAttendees; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."eventAttendees" (
    "eventId" integer NOT NULL,
    "userId" integer NOT NULL
);


--
-- Name: events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.events (
    "eventId" integer NOT NULL,
    "eventName" text NOT NULL,
    "storeId" integer NOT NULL,
    "startTime" timestamp without time zone NOT NULL,
    description text NOT NULL,
    "gameFormat" text NOT NULL,
    "gameId" integer NOT NULL,
    "entranceFee" numeric NOT NULL
);


--
-- Name: events_eventId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."events_eventId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: events_eventId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."events_eventId_seq" OWNED BY public.events."eventId";


--
-- Name: game; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.game (
    "gameId" integer NOT NULL,
    "gameName" text NOT NULL
);


--
-- Name: game_gameId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."game_gameId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: game_gameId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."game_gameId_seq" OWNED BY public.game."gameId";


--
-- Name: hangoutAttendees; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."hangoutAttendees" (
    "hangoutId" integer NOT NULL,
    "userId" integer NOT NULL
);


--
-- Name: hangouts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hangouts (
    "hangoutId" integer NOT NULL,
    "hangoutName" text NOT NULL,
    "hostId" integer NOT NULL,
    "startTime" timestamp without time zone NOT NULL,
    description text NOT NULL,
    "gameFormat" text NOT NULL,
    "gameId" integer NOT NULL
);


--
-- Name: hangouts_hangoutId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."hangouts_hangoutId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hangouts_hangoutId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."hangouts_hangoutId_seq" OWNED BY public.hangouts."hangoutId";


--
-- Name: stores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stores (
    "storeId" integer NOT NULL,
    "storeName" text NOT NULL,
    long numeric NOT NULL,
    lat numeric NOT NULL,
    "openingTime" integer NOT NULL,
    "closingTime" integer NOT NULL,
    website text NOT NULL,
    "phoneNumber" text NOT NULL
);


--
-- Name: stores_storeId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."stores_storeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stores_storeId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."stores_storeId_seq" OWNED BY public.stores."storeId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    "userName" text NOT NULL,
    "deckArchetype" text,
    "mainGameId" integer,
    email text NOT NULL,
    "isStoreEmployee" boolean
);


--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: events eventId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events ALTER COLUMN "eventId" SET DEFAULT nextval('public."events_eventId_seq"'::regclass);


--
-- Name: game gameId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.game ALTER COLUMN "gameId" SET DEFAULT nextval('public."game_gameId_seq"'::regclass);


--
-- Name: hangouts hangoutId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hangouts ALTER COLUMN "hangoutId" SET DEFAULT nextval('public."hangouts_hangoutId_seq"'::regclass);


--
-- Name: stores storeId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stores ALTER COLUMN "storeId" SET DEFAULT nextval('public."stores_storeId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: eventAttendees; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."eventAttendees" ("eventId", "userId") FROM stdin;
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.events ("eventId", "eventName", "storeId", "startTime", description, "gameFormat", "gameId", "entranceFee") FROM stdin;
\.


--
-- Data for Name: game; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.game ("gameId", "gameName") FROM stdin;
1	Magic The Gathering
2	Yu-Gi-Oh
\.


--
-- Data for Name: hangoutAttendees; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."hangoutAttendees" ("hangoutId", "userId") FROM stdin;
\.


--
-- Data for Name: hangouts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.hangouts ("hangoutId", "hangoutName", "hostId", "startTime", description, "gameFormat", "gameId") FROM stdin;
1	Shadow Realm DUEL 	2	2020-01-30 03:00:00	Fight me. Contact me at 949-420-6969'	Yu-Gi-Oh	2
2	Magic and Chill	1	2020-01-29 04:20:00	We play some Magic, then we chill. Haha, jk... unless? Hit me up though. 618-897-5672	Pioneer	1
3	Hardcore Modern practice	2	2020-02-15 01:30:00	I really want to practice my deck. This is some real hardcore practice, so no funny business. I want to WIN the next major. I am really good at this game, so casuals BEWARE. But all are welcome! Let me know if you can play... 949-420-6969	Modern	1
4	Yugimans	3	2020-02-11 06:30:00	Let us play some Yu-Gi-OH	Yu-Gi-Oh	2
\.


--
-- Data for Name: stores; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.stores ("storeId", "storeName", long, lat, "openingTime", "closingTime", website, "phoneNumber") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", "userName", "deckArchetype", "mainGameId", email, "isStoreEmployee") FROM stdin;
\.


--
-- Name: events_eventId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."events_eventId_seq"', 1, false);


--
-- Name: game_gameId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."game_gameId_seq"', 2, true);


--
-- Name: hangouts_hangoutId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."hangouts_hangoutId_seq"', 1, false);


--
-- Name: stores_storeId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."stores_storeId_seq"', 1, false);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 1, false);


--
-- Name: eventAttendees eventAttendees_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."eventAttendees"
    ADD CONSTRAINT "eventAttendees_pkey" PRIMARY KEY ("eventId", "userId");


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY ("eventId");


--
-- Name: game game_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_pkey PRIMARY KEY ("gameId");


--
-- Name: hangoutAttendees hangoutAttendees_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."hangoutAttendees"
    ADD CONSTRAINT "hangoutAttendees_pkey" PRIMARY KEY ("hangoutId", "userId");


--
-- Name: hangouts hangouts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hangouts
    ADD CONSTRAINT hangouts_pkey PRIMARY KEY ("hangoutId");


--
-- Name: stores stores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_pkey PRIMARY KEY ("storeId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

