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

ALTER TABLE ONLY public."hangoutAttendees" DROP CONSTRAINT "hangoutAttendees_userId_fkey";
ALTER TABLE ONLY public."hangoutAttendees" DROP CONSTRAINT "hangoutAttendees_hangoutId_fkey";
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.stores DROP CONSTRAINT stores_pkey;
ALTER TABLE ONLY public.hangouts DROP CONSTRAINT hangouts_pkey;
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
    "startTime" timestamp without time zone NOT NULL,
    description text NOT NULL,
    "gameFormat" text NOT NULL,
    "gameId" integer NOT NULL,
    "entranceFee" numeric NOT NULL,
    "storeName" text
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
    "userId" integer,
    "hangoutId" integer
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
    "gameId" integer NOT NULL,
    zipcode integer,
    "contactInfo" text
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
    "isStoreEmployee" boolean,
    password text NOT NULL,
    "storeName" text
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

COPY public.events ("eventId", "eventName", "startTime", description, "gameFormat", "gameId", "entranceFee", "storeName") FROM stdin;
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

COPY public."hangoutAttendees" ("userId", "hangoutId") FROM stdin;
\.


--
-- Data for Name: hangouts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.hangouts ("hangoutId", "hangoutName", "hostId", "startTime", description, "gameFormat", "gameId", zipcode, "contactInfo") FROM stdin;
\.


--
-- Data for Name: stores; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.stores ("storeId", "storeName", long, lat, "openingTime", "closingTime", website, "phoneNumber") FROM stdin;
1	"Yeezy Cards"	-116.515961	33.776993	10	8	"www.yeezycards.ye"	"(808) - 350 - 7500"
2	"Down B Cards"	-118.546265	34.390118	12	10	"www.downbcards.com"	"(420) - 234 - 1221"
3	"Pink Gang Cards"	-118.328384	34.098011	11	11	"www.pinkgangcards.io"	"(770) - 520 - 9669"
4	"Poop Storm Cards"	-118.236214	34.103405	11	7	"www.poopstormcards.art"	"(699) - 420 - 6996"
5	"Fieri Cards"	-118.287399	34.090885	9	12	"www.fiericards.guy"	"(345) - 431 - 9786"
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", "userName", "deckArchetype", "mainGameId", email, "isStoreEmployee", password, "storeName") FROM stdin;
\.


--
-- Name: events_eventId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."events_eventId_seq"', 8, true);


--
-- Name: game_gameId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."game_gameId_seq"', 2, true);


--
-- Name: hangouts_hangoutId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."hangouts_hangoutId_seq"', 25, true);


--
-- Name: stores_storeId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."stores_storeId_seq"', 1, false);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 22, true);


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
-- Name: hangoutAttendees hangoutAttendees_hangoutId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."hangoutAttendees"
    ADD CONSTRAINT "hangoutAttendees_hangoutId_fkey" FOREIGN KEY ("hangoutId") REFERENCES public.hangouts("hangoutId");


--
-- Name: hangoutAttendees hangoutAttendees_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."hangoutAttendees"
    ADD CONSTRAINT "hangoutAttendees_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

