--
-- PostgreSQL database dump
--

-- Dumped from database version 10.0
-- Dumped by pg_dump version 10.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);


ALTER TABLE auth_group OWNER TO peter;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: peter
--

CREATE SEQUENCE auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth_group_id_seq OWNER TO peter;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: peter
--

ALTER SEQUENCE auth_group_id_seq OWNED BY auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE auth_group_permissions OWNER TO peter;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: peter
--

CREATE SEQUENCE auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth_group_permissions_id_seq OWNER TO peter;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: peter
--

ALTER SEQUENCE auth_group_permissions_id_seq OWNED BY auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE auth_permission OWNER TO peter;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: peter
--

CREATE SEQUENCE auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth_permission_id_seq OWNER TO peter;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: peter
--

ALTER SEQUENCE auth_permission_id_seq OWNED BY auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE auth_user OWNER TO peter;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE auth_user_groups OWNER TO peter;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: peter
--

CREATE SEQUENCE auth_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth_user_groups_id_seq OWNER TO peter;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: peter
--

ALTER SEQUENCE auth_user_groups_id_seq OWNED BY auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: peter
--

CREATE SEQUENCE auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth_user_id_seq OWNER TO peter;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: peter
--

ALTER SEQUENCE auth_user_id_seq OWNED BY auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE auth_user_user_permissions OWNER TO peter;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: peter
--

CREATE SEQUENCE auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth_user_user_permissions_id_seq OWNER TO peter;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: peter
--

ALTER SEQUENCE auth_user_user_permissions_id_seq OWNED BY auth_user_user_permissions.id;


--
-- Name: chop_group; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE chop_group (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    date_created date NOT NULL,
    last_used date NOT NULL
);


ALTER TABLE chop_group OWNER TO peter;

--
-- Name: chop_group_id_seq; Type: SEQUENCE; Schema: public; Owner: peter
--

CREATE SEQUENCE chop_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE chop_group_id_seq OWNER TO peter;

--
-- Name: chop_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: peter
--

ALTER SEQUENCE chop_group_id_seq OWNED BY chop_group.id;


--
-- Name: chop_item; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE chop_item (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    value numeric(5,2) NOT NULL,
    receipt_id integer NOT NULL,
    user_owns_id integer NOT NULL
);


ALTER TABLE chop_item OWNER TO peter;

--
-- Name: chop_item_id_seq; Type: SEQUENCE; Schema: public; Owner: peter
--

CREATE SEQUENCE chop_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE chop_item_id_seq OWNER TO peter;

--
-- Name: chop_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: peter
--

ALTER SEQUENCE chop_item_id_seq OWNED BY chop_item.id;


--
-- Name: chop_item_user; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE chop_item_user (
    id integer NOT NULL,
    item_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE chop_item_user OWNER TO peter;

--
-- Name: chop_item_user_id_seq; Type: SEQUENCE; Schema: public; Owner: peter
--

CREATE SEQUENCE chop_item_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE chop_item_user_id_seq OWNER TO peter;

--
-- Name: chop_item_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: peter
--

ALTER SEQUENCE chop_item_user_id_seq OWNED BY chop_item_user.id;


--
-- Name: chop_profile; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE chop_profile (
    id integer NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    venmo character varying(30) NOT NULL,
    user_id integer NOT NULL,
    phone_number character varying(30) NOT NULL
);


ALTER TABLE chop_profile OWNER TO peter;

--
-- Name: chop_profile_id_seq; Type: SEQUENCE; Schema: public; Owner: peter
--

CREATE SEQUENCE chop_profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE chop_profile_id_seq OWNER TO peter;

--
-- Name: chop_profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: peter
--

ALTER SEQUENCE chop_profile_id_seq OWNED BY chop_profile.id;


--
-- Name: chop_receipt; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE chop_receipt (
    id integer NOT NULL,
    photo_bucket character varying(30) NOT NULL,
    "timestamp" date NOT NULL,
    total_cost numeric(5,2) NOT NULL,
    tip numeric(5,2) NOT NULL,
    tax numeric(5,2) NOT NULL,
    title character varying(30) NOT NULL,
    is_complete boolean NOT NULL,
    group_id integer NOT NULL,
    owner_id integer NOT NULL,
    image character varying(100)
);


ALTER TABLE chop_receipt OWNER TO peter;

--
-- Name: chop_receipt_id_seq; Type: SEQUENCE; Schema: public; Owner: peter
--

CREATE SEQUENCE chop_receipt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE chop_receipt_id_seq OWNER TO peter;

--
-- Name: chop_receipt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: peter
--

ALTER SEQUENCE chop_receipt_id_seq OWNED BY chop_receipt.id;


--
-- Name: chop_receiptmembership; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE chop_receiptmembership (
    id integer NOT NULL,
    outstanding_payment numeric(5,2) NOT NULL,
    receipt_id integer NOT NULL,
    users_id integer NOT NULL,
    notified boolean NOT NULL
);


ALTER TABLE chop_receiptmembership OWNER TO peter;

--
-- Name: chop_receiptmembership_id_seq; Type: SEQUENCE; Schema: public; Owner: peter
--

CREATE SEQUENCE chop_receiptmembership_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE chop_receiptmembership_id_seq OWNER TO peter;

--
-- Name: chop_receiptmembership_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: peter
--

ALTER SEQUENCE chop_receiptmembership_id_seq OWNED BY chop_receiptmembership.id;


--
-- Name: chop_usermembership; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE chop_usermembership (
    id integer NOT NULL,
    date_joined date NOT NULL,
    role character varying(30) NOT NULL,
    group_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE chop_usermembership OWNER TO peter;

--
-- Name: chop_usermembership_id_seq; Type: SEQUENCE; Schema: public; Owner: peter
--

CREATE SEQUENCE chop_usermembership_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE chop_usermembership_id_seq OWNER TO peter;

--
-- Name: chop_usermembership_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: peter
--

ALTER SEQUENCE chop_usermembership_id_seq OWNED BY chop_usermembership.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE django_admin_log OWNER TO peter;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: peter
--

CREATE SEQUENCE django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE django_admin_log_id_seq OWNER TO peter;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: peter
--

ALTER SEQUENCE django_admin_log_id_seq OWNED BY django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE django_content_type OWNER TO peter;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: peter
--

CREATE SEQUENCE django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE django_content_type_id_seq OWNER TO peter;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: peter
--

ALTER SEQUENCE django_content_type_id_seq OWNED BY django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE django_migrations OWNER TO peter;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: peter
--

CREATE SEQUENCE django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE django_migrations_id_seq OWNER TO peter;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: peter
--

ALTER SEQUENCE django_migrations_id_seq OWNED BY django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: peter
--

CREATE TABLE django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE django_session OWNER TO peter;

--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_group ALTER COLUMN id SET DEFAULT nextval('auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_permission ALTER COLUMN id SET DEFAULT nextval('auth_permission_id_seq'::regclass);


--
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_user ALTER COLUMN id SET DEFAULT nextval('auth_user_id_seq'::regclass);


--
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_user_groups ALTER COLUMN id SET DEFAULT nextval('auth_user_groups_id_seq'::regclass);


--
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('auth_user_user_permissions_id_seq'::regclass);


--
-- Name: chop_group id; Type: DEFAULT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_group ALTER COLUMN id SET DEFAULT nextval('chop_group_id_seq'::regclass);


--
-- Name: chop_item id; Type: DEFAULT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_item ALTER COLUMN id SET DEFAULT nextval('chop_item_id_seq'::regclass);


--
-- Name: chop_item_user id; Type: DEFAULT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_item_user ALTER COLUMN id SET DEFAULT nextval('chop_item_user_id_seq'::regclass);


--
-- Name: chop_profile id; Type: DEFAULT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_profile ALTER COLUMN id SET DEFAULT nextval('chop_profile_id_seq'::regclass);


--
-- Name: chop_receipt id; Type: DEFAULT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_receipt ALTER COLUMN id SET DEFAULT nextval('chop_receipt_id_seq'::regclass);


--
-- Name: chop_receiptmembership id; Type: DEFAULT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_receiptmembership ALTER COLUMN id SET DEFAULT nextval('chop_receiptmembership_id_seq'::regclass);


--
-- Name: chop_usermembership id; Type: DEFAULT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_usermembership ALTER COLUMN id SET DEFAULT nextval('chop_usermembership_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: peter
--

ALTER TABLE ONLY django_admin_log ALTER COLUMN id SET DEFAULT nextval('django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: peter
--

ALTER TABLE ONLY django_content_type ALTER COLUMN id SET DEFAULT nextval('django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: peter
--

ALTER TABLE ONLY django_migrations ALTER COLUMN id SET DEFAULT nextval('django_migrations_id_seq'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can add group	2	add_group
5	Can change group	2	change_group
6	Can delete group	2	delete_group
7	Can add permission	3	add_permission
8	Can change permission	3	change_permission
9	Can delete permission	3	delete_permission
10	Can add user	4	add_user
11	Can change user	4	change_user
12	Can delete user	4	delete_user
13	Can add content type	5	add_contenttype
14	Can change content type	5	change_contenttype
15	Can delete content type	5	delete_contenttype
16	Can add session	6	add_session
17	Can change session	6	change_session
18	Can delete session	6	delete_session
19	Can add item	7	add_item
20	Can change item	7	change_item
21	Can delete item	7	delete_item
22	Can add receipt	8	add_receipt
23	Can change receipt	8	change_receipt
24	Can delete receipt	8	delete_receipt
25	Can add receipt membership	9	add_receiptmembership
26	Can change receipt membership	9	change_receiptmembership
27	Can delete receipt membership	9	delete_receiptmembership
28	Can add group	10	add_group
29	Can change group	10	change_group
30	Can delete group	10	delete_group
31	Can add profile	11	add_profile
32	Can change profile	11	change_profile
33	Can delete profile	11	delete_profile
34	Can add user membership	12	add_usermembership
35	Can change user membership	12	change_usermembership
36	Can delete user membership	12	delete_usermembership
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
3	pbkdf2_sha256$36000$FVVRdG7flWhM$hvV2rNpIGcq91P+hMo/6emlQ9WWnndfas5TxOSHilF4=	\N	f	joe				f	t	2017-11-08 11:51:50.904895-05
1	pbkdf2_sha256$36000$cOcRHk67N5aS$M5WzxGx/hDyB4dE8ETQ/u7/hRbnYCQUeTslihSsbMBY=	2017-11-11 23:43:37.695807-05	t	peter			p@p.com	t	t	2017-11-08 11:14:10.292-05
2	pbkdf2_sha256$36000$zjM77Tqd8Upc$CswUqMQW3CIBCTIIIjbR/8AspJYGm3ASG/Bz3pFyNiM=	2017-11-12 03:21:56.681327-05	f	Ramana			ramanak@umich.edu	f	t	2017-11-08 11:15:18.925-05
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: chop_group; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY chop_group (id, name, date_created, last_used) FROM stdin;
1	eecs441squaaa	2017-10-30	2017-10-30
2	Test2	2017-11-12	2017-11-12
4	test4	2017-11-12	2017-11-12
3	tes3	2017-11-12	2017-11-12
\.


--
-- Data for Name: chop_item; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY chop_item (id, name, value, receipt_id, user_owns_id) FROM stdin;
1	ciroc	35.00	1	1
2	dog12	21.00	1	2
3	moo	32.00	1	2
10	1hi	10.00	1	1
9	2hi	10.00	1	1
8	3hi	10.00	1	1
7	4hi	10.00	1	1
6	5hi	10.00	1	1
\.


--
-- Data for Name: chop_item_user; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY chop_item_user (id, item_id, user_id) FROM stdin;
\.


--
-- Data for Name: chop_profile; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY chop_profile (id, first_name, last_name, venmo, user_id, phone_number) FROM stdin;
3	moo	asd	hello	3	+1
1	moo	asd	hello	1	+1
2	moo	asd	eecs	2	+1
\.


--
-- Data for Name: chop_receipt; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY chop_receipt (id, photo_bucket, "timestamp", total_cost, tip, tax, title, is_complete, group_id, owner_id, image) FROM stdin;
3	ads	2017-11-12	13.00	12.00	123.00	qkjsndlkasf	f	2	1	
1	sample-s3-bucket	2017-10-30	40.00	0.00	5.00	alcohol	f	2	2	
2	eqw	2017-11-12	12.00	12.00	312.00	Dogs	f	3	3	
\.


--
-- Data for Name: chop_receiptmembership; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY chop_receiptmembership (id, outstanding_payment, receipt_id, users_id, notified) FROM stdin;
1	40.00	1	2	f
3	32.00	2	1	f
4	32.00	2	3	f
2	12.00	2	2	f
5	10.00	3	2	f
6	10.00	3	3	f
7	10.00	3	1	f
\.


--
-- Data for Name: chop_usermembership; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY chop_usermembership (id, date_joined, role, group_id, user_id) FROM stdin;
1	2017-10-30	nerd	1	2
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2017-11-08 11:51:51.063211-05	3	joe	1	[{"added": {}}]	4	1
2	2017-11-08 12:14:50.834796-05	1	alcohol	2	[{"changed": {"fields": ["owner"]}}]	8	1
3	2017-11-08 12:15:01.695447-05	1	 2017-10-30	2	[]	9	1
4	2017-11-11 15:59:55.933596-05	2	dog12	1	[{"added": {}}]	7	1
5	2017-11-11 16:00:06.813191-05	3	moo	1	[{"added": {}}]	7	1
6	2017-11-11 20:48:29.624627-05	2	Dogs	1	[{"added": {}}]	8	1
7	2017-11-11 20:48:36.044425-05	1	alcohol	2	[]	8	1
8	2017-11-11 20:48:54.814008-05	2	 2017-11-12	1	[{"added": {}}]	9	1
9	2017-11-11 20:49:18.298897-05	3	 2017-11-12	1	[{"added": {}}]	9	1
10	2017-11-11 20:49:26.039188-05	4	 2017-11-12	1	[{"added": {}}]	9	1
11	2017-11-11 20:49:32.782523-05	2	 2017-11-12	2	[]	9	1
12	2017-11-11 21:01:46.917847-05	3	qkjsndlkasf	1	[{"added": {}}]	8	1
13	2017-11-11 21:15:42.372896-05	5	 2017-11-12	1	[{"added": {}}]	9	1
14	2017-11-11 21:15:49.468585-05	6	 2017-11-12	1	[{"added": {}}]	9	1
15	2017-11-11 21:15:59.296337-05	7	 2017-11-12	1	[{"added": {}}]	9	1
16	2017-11-11 23:18:07.108958-05	2	Test2	1	[{"added": {}}]	10	1
17	2017-11-11 23:18:11.41925-05	3	tes3	1	[{"added": {}}]	10	1
18	2017-11-11 23:18:16.128975-05	4	test4	1	[{"added": {}}]	10	1
19	2017-11-11 23:18:24.613736-05	3	qkjsndlkasf	2	[{"changed": {"fields": ["group"]}}]	8	1
20	2017-11-11 23:18:31.99709-05	1	alcohol	2	[{"changed": {"fields": ["group"]}}]	8	1
21	2017-11-11 23:18:36.340087-05	2	Dogs	2	[{"changed": {"fields": ["group"]}}]	8	1
22	2017-11-11 23:39:28.194465-05	10	1hi	2	[{"changed": {"fields": ["name"]}}]	7	1
23	2017-11-11 23:39:32.286463-05	9	2hi	2	[{"changed": {"fields": ["name"]}}]	7	1
24	2017-11-11 23:42:20.504491-05	8	3hi	2	[{"changed": {"fields": ["name"]}}]	7	1
25	2017-11-11 23:42:27.153993-05	7	4hi	2	[{"changed": {"fields": ["name"]}}]	7	1
26	2017-11-11 23:42:31.605391-05	6	5hi	2	[{"changed": {"fields": ["name"]}}]	7	1
27	2017-11-11 23:42:38.301571-05	5	6hi	2	[{"changed": {"fields": ["name"]}}]	7	1
28	2017-11-11 23:42:43.012233-05	4	7hi	2	[{"changed": {"fields": ["name"]}}]	7	1
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	group
3	auth	permission
4	auth	user
5	contenttypes	contenttype
6	sessions	session
7	chop	item
8	chop	receipt
9	chop	receiptmembership
10	chop	group
11	chop	profile
12	chop	usermembership
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2017-11-08 11:13:08.822824-05
2	auth	0001_initial	2017-11-08 11:13:08.893789-05
3	admin	0001_initial	2017-11-08 11:13:08.919511-05
4	admin	0002_logentry_remove_auto_add	2017-11-08 11:13:08.938338-05
5	contenttypes	0002_remove_content_type_name	2017-11-08 11:13:08.969652-05
6	auth	0002_alter_permission_name_max_length	2017-11-08 11:13:08.981288-05
7	auth	0003_alter_user_email_max_length	2017-11-08 11:13:08.9938-05
8	auth	0004_alter_user_username_opts	2017-11-08 11:13:09.009987-05
9	auth	0005_alter_user_last_login_null	2017-11-08 11:13:09.027411-05
10	auth	0006_require_contenttypes_0002	2017-11-08 11:13:09.030042-05
11	auth	0007_alter_validators_add_error_messages	2017-11-08 11:13:09.051116-05
12	auth	0008_alter_user_username_max_length	2017-11-08 11:13:09.074511-05
13	chop	0001_initial	2017-11-08 11:13:09.222056-05
14	chop	0002_auto_20171106_1856	2017-11-08 11:13:09.235603-05
15	chop	0003_remove_users_venmo_handle	2017-11-08 11:13:09.245898-05
16	chop	0004_users_venmo	2017-11-08 11:13:09.264309-05
17	chop	0005_auto_20171106_1911	2017-11-08 11:13:09.303746-05
18	chop	0006_auto_20171108_1611	2017-11-08 11:13:09.50005-05
19	sessions	0001_initial	2017-11-08 11:13:09.510482-05
20	chop	0007_receipt_image	2017-11-11 15:21:12.964915-05
21	chop	0008_profile_phone_number	2017-11-11 15:21:13.005453-05
22	chop	0009_receiptmembership_notified	2017-11-11 20:33:55.393928-05
23	chop	0010_auto_20171112_0416	2017-11-11 23:16:59.636167-05
24	chop	0011_auto_20171112_0602	2017-11-12 01:04:06.017973-05
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: peter
--

COPY django_session (session_key, session_data, expire_date) FROM stdin;
ylxpb7e186u2izvp0czo9njdts7sboaf	OWFjY2RiNzE5MmJmYTMxMmEwMjlhNmI2ZDE0M2VkMzU1M2ExYWUyMDp7Il9hdXRoX3VzZXJfaGFzaCI6ImE4MTkxYzhjMTg3MjBkNGZkZWI4OWZhYmMzMmM1ZTM2MzZjNDJhYjkiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIyIn0=	2017-11-22 13:01:03.413614-05
8vqc3b9dvcd0gl00o5odlooefx99ynxp	OWRiMDdiYTk2YjY5ZDAxMmE0ZTJkZTBkYjU3NTUyOWFhNjg0MTdjZTp7Il9hdXRoX3VzZXJfaGFzaCI6ImRlOTM5OWVjY2YwZTNjNzMxYjliZTljNTJlOTk1Zjk3ZjZiMjU5YmYiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2017-11-22 13:01:17.309953-05
jtevt7cj2d046ck3ueylnugf9uz1epu5	OWRiMDdiYTk2YjY5ZDAxMmE0ZTJkZTBkYjU3NTUyOWFhNjg0MTdjZTp7Il9hdXRoX3VzZXJfaGFzaCI6ImRlOTM5OWVjY2YwZTNjNzMxYjliZTljNTJlOTk1Zjk3ZjZiMjU5YmYiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2017-11-25 17:22:13.922563-05
vg010agekevjpzvwsxeabaq29yi8ic7o	OWRiMDdiYTk2YjY5ZDAxMmE0ZTJkZTBkYjU3NTUyOWFhNjg0MTdjZTp7Il9hdXRoX3VzZXJfaGFzaCI6ImRlOTM5OWVjY2YwZTNjNzMxYjliZTljNTJlOTk1Zjk3ZjZiMjU5YmYiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2017-11-25 23:43:37.70689-05
o7ms13ply5awf5i6xq040vyytzg88ah5	OWFjY2RiNzE5MmJmYTMxMmEwMjlhNmI2ZDE0M2VkMzU1M2ExYWUyMDp7Il9hdXRoX3VzZXJfaGFzaCI6ImE4MTkxYzhjMTg3MjBkNGZkZWI4OWZhYmMzMmM1ZTM2MzZjNDJhYjkiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIyIn0=	2017-11-26 03:21:56.68736-05
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: peter
--

SELECT pg_catalog.setval('auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: peter
--

SELECT pg_catalog.setval('auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: peter
--

SELECT pg_catalog.setval('auth_permission_id_seq', 36, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: peter
--

SELECT pg_catalog.setval('auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: peter
--

SELECT pg_catalog.setval('auth_user_id_seq', 3, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: peter
--

SELECT pg_catalog.setval('auth_user_user_permissions_id_seq', 1, false);


--
-- Name: chop_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: peter
--

SELECT pg_catalog.setval('chop_group_id_seq', 4, true);


--
-- Name: chop_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: peter
--

SELECT pg_catalog.setval('chop_item_id_seq', 10, true);


--
-- Name: chop_item_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: peter
--

SELECT pg_catalog.setval('chop_item_user_id_seq', 1, false);


--
-- Name: chop_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: peter
--

SELECT pg_catalog.setval('chop_profile_id_seq', 3, true);


--
-- Name: chop_receipt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: peter
--

SELECT pg_catalog.setval('chop_receipt_id_seq', 3, true);


--
-- Name: chop_receiptmembership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: peter
--

SELECT pg_catalog.setval('chop_receiptmembership_id_seq', 7, true);


--
-- Name: chop_usermembership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: peter
--

SELECT pg_catalog.setval('chop_usermembership_id_seq', 1, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: peter
--

SELECT pg_catalog.setval('django_admin_log_id_seq', 28, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: peter
--

SELECT pg_catalog.setval('django_content_type_id_seq', 12, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: peter
--

SELECT pg_catalog.setval('django_migrations_id_seq', 24, true);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: chop_group chop_group_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_group
    ADD CONSTRAINT chop_group_pkey PRIMARY KEY (id);


--
-- Name: chop_item chop_item_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_item
    ADD CONSTRAINT chop_item_pkey PRIMARY KEY (id);


--
-- Name: chop_item_user chop_item_user_item_id_user_id_d9c2880c_uniq; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_item_user
    ADD CONSTRAINT chop_item_user_item_id_user_id_d9c2880c_uniq UNIQUE (item_id, user_id);


--
-- Name: chop_item_user chop_item_user_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_item_user
    ADD CONSTRAINT chop_item_user_pkey PRIMARY KEY (id);


--
-- Name: chop_profile chop_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_profile
    ADD CONSTRAINT chop_profile_pkey PRIMARY KEY (id);


--
-- Name: chop_profile chop_profile_user_id_key; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_profile
    ADD CONSTRAINT chop_profile_user_id_key UNIQUE (user_id);


--
-- Name: chop_receipt chop_receipt_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_receipt
    ADD CONSTRAINT chop_receipt_pkey PRIMARY KEY (id);


--
-- Name: chop_receiptmembership chop_receiptmembership_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_receiptmembership
    ADD CONSTRAINT chop_receiptmembership_pkey PRIMARY KEY (id);


--
-- Name: chop_usermembership chop_usermembership_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_usermembership
    ADD CONSTRAINT chop_usermembership_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX auth_group_name_a6ea08ec_like ON auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX auth_user_groups_group_id_97559544 ON auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX auth_user_username_6821ab7c_like ON auth_user USING btree (username varchar_pattern_ops);


--
-- Name: chop_item_receipt_id_4fa198b5; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX chop_item_receipt_id_4fa198b5 ON chop_item USING btree (receipt_id);


--
-- Name: chop_item_user_item_id_69938ed1; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX chop_item_user_item_id_69938ed1 ON chop_item_user USING btree (item_id);


--
-- Name: chop_item_user_owns_id_26f969d4; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX chop_item_user_owns_id_26f969d4 ON chop_item USING btree (user_owns_id);


--
-- Name: chop_item_user_user_id_ce1516ed; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX chop_item_user_user_id_ce1516ed ON chop_item_user USING btree (user_id);


--
-- Name: chop_receipt_group_id_011a4710; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX chop_receipt_group_id_011a4710 ON chop_receipt USING btree (group_id);


--
-- Name: chop_receipt_owner_id_c5ecc60e; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX chop_receipt_owner_id_c5ecc60e ON chop_receipt USING btree (owner_id);


--
-- Name: chop_receiptmembership_receipt_id_688cf514; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX chop_receiptmembership_receipt_id_688cf514 ON chop_receiptmembership USING btree (receipt_id);


--
-- Name: chop_receiptmembership_users_id_2edbcd9e; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX chop_receiptmembership_users_id_2edbcd9e ON chop_receiptmembership USING btree (users_id);


--
-- Name: chop_usermembership_group_id_62b0bc02; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX chop_usermembership_group_id_62b0bc02 ON chop_usermembership USING btree (group_id);


--
-- Name: chop_usermembership_user_id_01d905dd; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX chop_usermembership_user_id_01d905dd ON chop_usermembership USING btree (user_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX django_session_expire_date_a5c62663 ON django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: peter
--

CREATE INDEX django_session_session_key_c0390e0f_like ON django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: chop_item chop_item_receipt_id_4fa198b5_fk_chop_receipt_id; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_item
    ADD CONSTRAINT chop_item_receipt_id_4fa198b5_fk_chop_receipt_id FOREIGN KEY (receipt_id) REFERENCES chop_receipt(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: chop_item_user chop_item_user_item_id_69938ed1_fk_chop_item_id; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_item_user
    ADD CONSTRAINT chop_item_user_item_id_69938ed1_fk_chop_item_id FOREIGN KEY (item_id) REFERENCES chop_item(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: chop_item chop_item_user_owns_id_26f969d4_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_item
    ADD CONSTRAINT chop_item_user_owns_id_26f969d4_fk_auth_user_id FOREIGN KEY (user_owns_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: chop_item_user chop_item_user_user_id_ce1516ed_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_item_user
    ADD CONSTRAINT chop_item_user_user_id_ce1516ed_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: chop_profile chop_profile_user_id_6e44cbe9_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_profile
    ADD CONSTRAINT chop_profile_user_id_6e44cbe9_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: chop_receipt chop_receipt_group_id_011a4710_fk_chop_group_id; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_receipt
    ADD CONSTRAINT chop_receipt_group_id_011a4710_fk_chop_group_id FOREIGN KEY (group_id) REFERENCES chop_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: chop_receipt chop_receipt_owner_id_c5ecc60e_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_receipt
    ADD CONSTRAINT chop_receipt_owner_id_c5ecc60e_fk_auth_user_id FOREIGN KEY (owner_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: chop_receiptmembership chop_receiptmembership_receipt_id_688cf514_fk_chop_receipt_id; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_receiptmembership
    ADD CONSTRAINT chop_receiptmembership_receipt_id_688cf514_fk_chop_receipt_id FOREIGN KEY (receipt_id) REFERENCES chop_receipt(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: chop_receiptmembership chop_receiptmembership_users_id_2edbcd9e_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_receiptmembership
    ADD CONSTRAINT chop_receiptmembership_users_id_2edbcd9e_fk_auth_user_id FOREIGN KEY (users_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: chop_usermembership chop_usermembership_group_id_62b0bc02_fk_chop_group_id; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_usermembership
    ADD CONSTRAINT chop_usermembership_group_id_62b0bc02_fk_chop_group_id FOREIGN KEY (group_id) REFERENCES chop_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: chop_usermembership chop_usermembership_user_id_01d905dd_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY chop_usermembership
    ADD CONSTRAINT chop_usermembership_user_id_01d905dd_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: peter
--

ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

