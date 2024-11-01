/* eslint-disable react/jsx-key */
import { Modal } from "react-bootstrap";
import { provincias, tipo_clientes } from "../../data/data";
import { useEffect, useState } from "react";
import { deleteData, getData, postData } from "../../service/apiService";
import { Loading } from "../../components/Loading/Loading";
import { toast } from "sonner";

export const Agentes = () => {
  const [showModal, setShowModal] = useState(false);
  const [usuarios, setUsuarios] = useState();
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    telefono: "",
    rol: "",
    provincia: "",
  });
  const cargarUsuarios = async () => {
    setLoading(true);
    const response = await getData("/usuarios");
    setUsuarios(response.data);
    setLoading(false);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const onSubmitAgente = async (e) => {
    e.preventDefault();
    try {
      toast.promise(postData("/usuarios", usuario), {
        loading: "Cargando...",
        success: (response) => {
          setShowModal(false);
          setUsuario(null);
          cargarUsuarios();
          return "Ingreso exitoso";
        },
        error: (response) => {
          console.log(response);
          return "Error al guardar agente";
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      toast.promise(deleteData("/usuarios/" + id), {
        loading: "Cargando...",
        success: (response) => {
          cargarUsuarios();
          return "Eliminacion exitosa";
        },
        error: (response) => {
          console.log(response);
          return "Error al eliminar usuario";
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Agentes</h3>
        <h6 className="text-secondary">Criterios de busqueda</h6>
        <form action="/" method="get" className="d-flex flex-wrap gap-3 col-12">
          <div className="col-12 col-md col-sm-4">
            <label className="form-label mb-1" htmlFor="ubicacion">
              Provincia
            </label>
            <select className="form-select" name="provincia" id="provincia">
              <option value="Todos">Todos</option>
              {provincias.map((prov) => {
                return <option value={prov}>{prov}</option>;
              })}
            </select>
          </div>
          <div className="col-12 col-md col-sm-4">
            <label className="form-label mb-1" htmlFor="estado">
              Estado
            </label>
            <select className="form-select" id="estado" name="estado">
              <option value="Todos">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div className="col d-flex align-items-end">
            <button className="btn btn-outline-secondary" type="submit">
              Filtrar
            </button>
          </div>
        </form>

        <div className="d-flex justify-content-end">
          <div className="dropdown">
            <button
              onClick={() => {
                setUsuario(null);
                setShowModal(true);
              }}
              className="btn btn-primary"
              type="button"
            >
              Nuevo
            </button>

            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              backdrop="static"
              keyboard={false}
            >
              <form onSubmit={onSubmitAgente}>
                <Modal.Header closeButton>
                  <Modal.Title className="text-primary">
                    Nuevo Agente
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="container">
                  <div className="d-flex flex-wrap justify-content-between px-2 gap-3">
                    <p className="border-bottom col-12 mb-0 fw-bold">
                      Datos del Agente
                    </p>
                    <input type="text" hidden value={usuario?.id} />
                    <div className="col-12 col-md-5">
                      <label className="form-label mb-1" htmlFor="nombre">
                        Nombre
                      </label>
                      <input
                        value={usuario?.nombre}
                        onChange={(e) =>
                          setUsuario({
                            ...usuario,
                            nombre: e.target.value,
                          })
                        }
                        required
                        type="text"
                        name="nombre"
                        id="nombre"
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-md-5">
                      <label className="form-label mb-1" htmlFor="apellido">
                        Apellido
                      </label>
                      <input
                        value={usuario?.apellido}
                        onChange={(e) =>
                          setUsuario({
                            ...usuario,
                            apellido: e.target.value,
                          })
                        }
                        required
                        type="text"
                        name="apellido"
                        id="apellido"
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-md-5">
                      <label className="form-label mb-1" htmlFor="correo">
                        Correo
                      </label>
                      <input
                        value={usuario?.correo}
                        onChange={(e) =>
                          setUsuario({
                            ...usuario,
                            correo: e.target.value,
                          })
                        }
                        required
                        type="email"
                        name="correo"
                        id="correo"
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-md-5">
                      <label className="form-label mb-1" htmlFor="password">
                        Contraseña
                      </label>
                      <input
                        value={usuario?.password}
                        onChange={(e) =>
                          setUsuario({
                            ...usuario,
                            password: e.target.value,
                          })
                        }
                        required
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-md-5">
                      <label className="form-label mb-1" htmlFor="dni">
                        DNI
                      </label>
                      <input
                        value={usuario?.dni}
                        onChange={(e) =>
                          setUsuario({
                            ...usuario,
                            dni: e.target.value,
                          })
                        }
                        required
                        type="text"
                        name="dni"
                        id="dni"
                        className="form-control"
                      />
                    </div>

                    <div className="col-12 col-md-5">
                      <label className="form-label mb-1" htmlFor="telefono">
                        Telefono
                      </label>
                      <input
                        value={usuario?.telefono}
                        onChange={(e) =>
                          setUsuario({
                            ...usuario,
                            telefono: e.target.value,
                          })
                        }
                        required
                        type="tel"
                        name="telefono"
                        id="telefono"
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-md-5">
                      <label className="form-label mb-1" htmlFor="dni">
                        Comision Venta(%)
                      </label>
                      <input
                        value={usuario?.comisionVenta}
                        onChange={(e) =>
                          setUsuario({
                            ...usuario,
                            comisionVenta: e.target.value,
                          })
                        }
                        required
                        min={0}
                        max={100}
                        step={0.1}
                        type="number"
                        name="comisionVenta"
                        id="comisionVenta"
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-md-5">
                      <label className="form-label mb-1" htmlFor="dni">
                        Comision Alquiler (%)
                      </label>
                      <input
                        value={usuario?.comisionAlquiler}
                        onChange={(e) =>
                          setUsuario({
                            ...usuario,
                            comisionAlquiler: e.target.value,
                          })
                        }
                        required
                        min={0}
                        max={100}
                        step={0.1}
                        type="number"
                        name="comisionAlquiler"
                        id="comisionAlquiler"
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-md-5">
                      <label className="form-label mb-1" htmlFor="provincia">
                        Provincia
                      </label>
                      <select
                        defaultValue={""}
                        value={usuario?.priovincia}
                        onChange={(e) =>
                          setUsuario({
                            ...usuario,
                            provincia: e.target.value,
                          })
                        }
                        className="form-select"
                        name="provincia"
                        id="provincia"
                      >
                        <option value="" disabled>
                          Seleccione...
                        </option>
                        {provincias.map((prov) => {
                          return <option value={prov}>{prov}</option>;
                        })}
                      </select>
                    </div>
                    <div className="col-12 col-md-5">
                      <label className="form-label mb-1" htmlFor="rol">
                        Rol
                      </label>
                      <select
                        defaultValue={""}
                        className="form-select"
                        name="rol"
                        id="rol"
                        value={usuario?.rol}
                        onChange={(e) =>
                          setUsuario({ ...usuario, rol: e.target.value })
                        }
                      >
                        <option value="" disabled>
                          Seleccione.. .
                        </option>
                        <option value="USER">Agente</option>
                        <option value="ADMIN">Administrador</option>
                      </select>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  {loading ? (
                    <Loading texto={"Cargando..."} />
                  ) : (
                    <>
                      <button
                        type="reset"
                        className="btn btn-outline-primary"
                        onClick={() => {
                          setUsuario(null);
                          setShowModal(false);
                        }}
                      >
                        Cerrar
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Guardar
                      </button>
                    </>
                  )}
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        </div>
      </div>
      <div className="bloque mt-4">
        <h3>Listado </h3>
        <p className="pb-0 mb-0 fw-ligth">Encontrados {usuarios?.length}</p>
        <div className="table-responsive">
          <table className="table table-dense table-sm table-striped table-hover">
            <thead>
              <tr>
                <th className="col-auto">#</th>
                <th className="col">Nombre</th>
                <th className="col">Apellido</th>
                <th className="col">Email</th>
                <th className="col">Provincia</th>
                <th className="col">Rol</th>
                <th className="col">Fecha Registro</th>
                <th className="col-auto"></th>
              </tr>
            </thead>
            <tbody>
              {loading && <p>Cargando...</p>}
              {usuarios?.map((usuario, index) => {
                return (
                  <tr>
                    <td>{++index}</td>
                    <td>{usuario?.nombre || "-"}</td>
                    <td>{usuario?.apellido || "-"}</td>
                    <td>{usuario?.correo || "-"}</td>
                    <td>{usuario?.provincia || "-"}</td>
                    <td>{usuario?.rol || "-"}</td>
                    <td>
                      {new Date(usuario?.fechaRegistro).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button hidden className="btn btn-primary btn-sm">
                          <i className="fa-solid fa-search"></i>
                        </button>
                        <button
                          onClick={() => {
                            setUsuario(usuario);
                            setShowModal(true);
                          }}
                          className="btn btn-outline-warning btn-sm"
                        >
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                "Seguro desea eliminar al usuario: " +
                                  usuario?.nombre
                              )
                            ) {
                              eliminarUsuario(usuario?.id);
                            }
                          }}
                          className="btn btn-outline-danger  btn-sm"
                        >
                          <i className="fa-solid fa-trash "></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
