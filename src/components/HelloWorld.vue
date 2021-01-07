<template>
  <v-container fluid style="width:95%;">
    <v-row>
      <div class="container-title">
        <h1>NutriOlla</h1>
        <p>Calculadora nutricional peruana</p>
      </div>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4" md="5">
        <div class="resultados">
          <div>
            <h2>Resultados</h2>
          </div>
          <!-- <div>
        <v-row>
          <v-col>
            <v-select 
              class="font"
              :items="sexos"
              item-text="Descripcion"
              item-value="Id"
              v-model="selectedSexo"
              label="Sexo"
              ></v-select>
          </v-col>
          <v-col>
            <v-select 
              yclass="font"
              :items="rangoEdades"
              item-text="Descripcion"
              item-value="Id"
              label="Rango Edad"
              v-model="selectedRangoEdad"          
            ></v-select>
          </v-col>
          <v-col>
            <v-btn small color="success" @click="getGruposNutricionales()">Buscar</v-btn>
          </v-col>
        </v-row>
          </div>-->
          <div>
            <v-row>
              <v-col>
                <div style="display:flex;flex-direction:column;">
                  <span style="font-size:0.9em;">Sexo</span>
                  <span
                    style="width:4em;height:2em;display:flex;align-items:center;justify-content:center;"
                  >{{ selectedSexo }}</span>
                </div>
              </v-col>
              <v-col>
                <div style="display:flex;flex-direction:column;">
                  <span style="font-size:0.9em;">Edad</span>
                  <span>{{ selectedRangoEdad }}</span>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
        <div>
          <p>
            Estos son los requerimientos de tu alimentación diaria basado en tu
            edad y sexo.
          </p>
        </div>
        <div v-for="gn in gruposNutricionales" :key="gn.idgrupoAlimenticio">
          <v-row>
            <v-col :cols="8">
              <div class="container_grupo_alimenticio">
                <div :style="{ backgroundColor: gn.color }"></div>
                <div>{{ gn.nombreGrupoAlimenticio }}</div>
              </div>
            </v-col>
            <v-col :cols="4" v-if="gn.idgrupoAlimenticio == 1">
              <div class="circle circle-bajo" v-if="g1 < gn.CantidadPorcionesEstimado">BAJO</div>
              <div class="circle circle-correcto" v-if="g1 == gn.CantidadPorcionesEstimado">CORRECTO</div>
              <div class="circle circle-alto" v-if="g1 > gn.CantidadPorcionesEstimado">ALTO</div>
            </v-col>

            <v-col :cols="4" v-if="gn.idgrupoAlimenticio == 2">
              <div class="circle circle-bajo" v-if="g2 < gn.CantidadPorcionesEstimado">BAJO</div>
              <div class="circle circle-correcto" v-if="g2 == gn.CantidadPorcionesEstimado">CORRECTO</div>
              <div class="circle circle-alto" v-if="g2 > gn.CantidadPorcionesEstimado">ALTO</div>
            </v-col>

            <v-col :cols="4" v-if="gn.idgrupoAlimenticio == 3">
              <div class="circle circle-bajo" v-if="g3 < gn.CantidadPorcionesEstimado">BAJO</div>
              <div class="circle circle-correcto" v-if="g3 == gn.CantidadPorcionesEstimado">CORRECTO</div>
              <div class="circle circle-alto" v-if="g3 > gn.CantidadPorcionesEstimado">ALTO</div>
            </v-col>

            <v-col :cols="4" v-if="gn.idgrupoAlimenticio == 4">
              <div class="circle circle-bajo" v-if="g4 < gn.CantidadPorcionesEstimado">BAJO</div>
              <div class="circle circle-correcto" v-if="g4 == gn.CantidadPorcionesEstimado">CORRECTO</div>
              <div class="circle circle-alto" v-if="g4 > gn.CantidadPorcionesEstimado">ALTO</div>
            </v-col>

            <v-col :cols="4" v-if="gn.idgrupoAlimenticio == 5">
              <div class="circle circle-bajo" v-if="g5 < gn.CantidadPorcionesEstimado">BAJO</div>
              <div class="circle circle-correcto" v-if="g5 == gn.CantidadPorcionesEstimado">CORRECTO</div>
              <div class="circle circle-alto" v-if="g5 > gn.CantidadPorcionesEstimado">ALTO</div>
            </v-col>

            <v-col :cols="4" v-if="gn.idgrupoAlimenticio == 6">
              <div class="circle circle-bajo" v-if="g6 < gn.CantidadPorcionesEstimado">BAJO</div>
              <div class="circle circle-correcto" v-if="g6 == gn.CantidadPorcionesEstimado">CORRECTO</div>
              <div class="circle circle-alto" v-if="g6 > gn.CantidadPorcionesEstimado">ALTO</div>
            </v-col>
            <v-col :cols="4" v-if="gn.idgrupoAlimenticio == 7">
              <div class="circle circle-bajo" v-if="g7 < gn.CantidadPorcionesEstimado">BAJO</div>
              <div class="circle circle-correcto" v-if="g7 == gn.CantidadPorcionesEstimado">CORRECTO</div>
              <div class="circle circle-alto" v-if="g7 > gn.CantidadPorcionesEstimado">ALTO</div>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" sm="8" md="7" class="alimentos">
        <h2>¿Qué comistes hoy?</h2>
        <p>Puedes agregar o editar tus alimentos</p>
        <v-card class="card mx-auto" max-width="100%">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title
                class="headline mb-1"
                style="font-size:1em !important;display:flex;justify-content:space-between;"
              >
                Desayuno
                <v-btn small color="success" @click="addAlimento('desayuno')">
                  <v-icon>add_box</v-icon>
                </v-btn>
              </v-list-item-title>
              <div>
                <v-row v-for="cAd in cantidadAlimentosDesayuno" :key="cAd.key">
                  <v-col :cols="5">
                    <v-autocomplete
                      class="font"
                      :items="alimentos"
                      item-text="Nombre"
                      item-value="Id"
                      no-data-text="Se estan cargando los alimentos..."
                      @change="changeAlimento('desayuno', cAd.key, $event)"
                      label="Buscar alimento"
                      :cbo-key="cAd.key"
                    ></v-autocomplete>
                  </v-col>
                  <v-col :cols="2">
                    <div>
                      <div style="margin:0 !important;padding:3px 0 3px 0;">
                        <span style="font-size:0.8em;">Porciones</span>
                      </div>
                      <div
                        style="margin:0 !important;display:flex;justify-content:space-around;align-items:center;"
                      >
                        <span>{{cAd.alimento.porciones == undefined ? 0: cAd.alimento.porciones}}</span>
                        <div style="display:flex;flex-direction:column;">
                          <button
                            disabled
                            :btn-key="cAd.key"
                            style="background-color:rgb(135, 245, 67);color:#fff; width:15px;border-radius:3px;margin:0 0 5px 0;"
                            @click="blurUnidad(cAd.key, 'desayuno','+')"
                          >+</button>
                          <button
                            disabled
                            :btn-key="cAd.key"
                            style="background-color:gray;color:#fff; width:15px;border-radius:3px;"
                            @click="blurUnidad(cAd.key, 'desayuno','-')"
                          >-</button>
                        </div>
                      </div>
                    </div>
                  </v-col>
                  <v-col :cols="4">
                    <div
                      :style="{ backgroundColor: cAd.alimento.color }"
                      class="circle tipo_alimento"
                    >{{cAd.alimento.porciones == undefined ? 0: parseFloat(cAd.alimento.porciones*cAd.alimento.Cantidad).toFixed("2")}} {{ cAd.alimento.MedidaCasera }}</div>
                  </v-col>
                  <v-col :cols="1">
                    <div style="height:100%;display:flex;align-items:center;" :div-key="cAd.key">
                      <button
                        @click="eliminar('desayuno', cAd.key)"
                        style="width:22px;height:25px;background-color:red;color:#fff;border-radius:5px;text-align:center;"
                      >
                        <v-icon
                          style="font-size:1em;color:#fff;text-align:center;margin-left:3.5px;"
                        >delete_box</v-icon>
                      </button>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <v-card class="card mx-auto" max-width="100%" style="margin-top:1.5em;">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title
                class="headline mb-1"
                style="font-size:1em !important;display:flex;justify-content:space-between;"
              >
                Almuerzo
                <v-btn small color="success" @click="addAlimento('almuerzo')">
                  <v-icon>add_box</v-icon>
                </v-btn>
              </v-list-item-title>
              <div>
                <v-row v-for="cAd in cantidadAlimentosAlmuerzo" :key="cAd.key">
                  <v-col :cols="5">
                    <v-autocomplete
                      class="font"
                      :items="alimentos"
                      item-text="Nombre"
                      item-value="Id"
                      no-data-text="Se estan cargando los alimentos..."
                      @change="changeAlimento('almuerzo', cAd.key, $event)"
                      label="Buscar alimento"
                      :cbo-key="cAd.key"
                    ></v-autocomplete>
                  </v-col>
                  <v-col :cols="2">
                    <div>
                      <div style="margin:0 !important;padding:3px 0 3px 0;">
                        <span style="font-size:0.8em;">Porciones</span>
                      </div>
                      <div
                        style="margin:0 !important;display:flex;justify-content:space-around;align-items:center;"
                      >
                        <span>{{cAd.alimento.porciones == undefined ? 0: cAd.alimento.porciones}}</span>
                        <div style="display:flex;flex-direction:column;">
                          <button
                            disabled
                            :btn-key="cAd.key"
                            style="background-color:rgb(135, 245, 67);color:#fff; width:15px;border-radius:3px;margin:0 0 5px 0;"
                            @click="blurUnidad(cAd.key, 'almuerzo','+')"
                          >+</button>
                          <button
                            disabled
                            :btn-key="cAd.key"
                            style="background-color:gray;color:#fff; width:15px;border-radius:3px;"
                            @click="blurUnidad(cAd.key, 'almuerzo','-')"
                          >-</button>
                        </div>
                      </div>
                    </div>
                  </v-col>
                  <v-col :cols="4">
                    <div
                      :style="{ backgroundColor: cAd.alimento.color }"
                      class="circle tipo_alimento"
                    >{{cAd.alimento.porciones == undefined ? 0: parseFloat(cAd.alimento.porciones*cAd.alimento.Cantidad).toFixed("2")}} {{ cAd.alimento.MedidaCasera }}</div>
                  </v-col>
                  <v-col :cols="1">
                    <div style="height:100%;display:flex;align-items:center;" :div-key="cAd.key">
                      <button
                        @click="eliminar('almuerzo', cAd.key)"
                        style="width:22px;height:25px;background-color:red;color:#fff;border-radius:5px;text-align:center;"
                      >
                        <v-icon
                          style="font-size:1em;color:#fff;text-align:center;margin-left:3.5px;"
                        >delete_box</v-icon>
                      </button>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <v-card class="card mx-auto" max-width="100%" style="margin-top:1.5em;">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title
                class="headline mb-1"
                style="font-size:1em !important;display:flex;justify-content:space-between;"
              >
                Cena
                <v-btn small color="success" @click="addAlimento('cena')">
                  <v-icon>add_box</v-icon>
                </v-btn>
              </v-list-item-title>
              <div>
                <v-row v-for="cAd in cantidadAlimentosCena" :key="cAd.key">
                  <v-col :cols="5">
                    <v-autocomplete
                      class="font"
                      :items="alimentos"
                      item-text="Nombre"
                      item-value="Id"
                      no-data-text="Se estan cargando los alimentos..."
                      @change="changeAlimento('cena', cAd.key, $event)"
                      label="Buscar alimento"
                      :cbo-key="cAd.key"
                    ></v-autocomplete>
                  </v-col>
                  <v-col :cols="2">
                    <div>
                      <div style="margin:0 !important;padding:3px 0 3px 0;">
                        <span style="font-size:0.8em;">Porciones</span>
                      </div>
                      <div
                        style="margin:0 !important;display:flex;justify-content:space-around;align-items:center;"
                      >
                        <span>{{cAd.alimento.porciones == undefined ? 0: cAd.alimento.porciones}}</span>
                        <div style="display:flex;flex-direction:column;">
                          <button
                            disabled
                            :btn-key="cAd.key"
                            style="background-color:rgb(135, 245, 67);color:#fff; width:15px;border-radius:3px;margin:0 0 5px 0;"
                            @click="blurUnidad(cAd.key, 'cena','+')"
                          >+</button>
                          <button
                            disabled
                            :btn-key="cAd.key"
                            style="background-color:gray;color:#fff; width:15px;border-radius:3px;"
                            @click="blurUnidad(cAd.key, 'cena','-')"
                          >-</button>
                        </div>
                      </div>
                    </div>
                  </v-col>
                  <v-col :cols="4">
                    <div
                      :style="{ backgroundColor: cAd.alimento.color }"
                      class="circle tipo_alimento"
                    >{{cAd.alimento.porciones == undefined ? 0: parseFloat(cAd.alimento.porciones*cAd.alimento.Cantidad).toFixed("2")}} {{ cAd.alimento.MedidaCasera }}</div>
                  </v-col>
                  <v-col :cols="1">
                    <div style="height:100%;display:flex;align-items:center;" :div-key="cAd.key">
                      <button
                        @click="eliminar('cena', cAd.key)"
                        style="width:22px;height:25px;background-color:red;color:#fff;border-radius:5px;text-align:center;"
                      >
                        <v-icon
                          style="font-size:1em;color:#fff;text-align:center;margin-left:3.5px;"
                        >delete_box</v-icon>
                      </button>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <div>
          <Load @update="onChildUpdate" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Load from "./Load";

export default {
  data() {
    return {
      sexos: [],
      rangoEdades: [],
      alimentos: [],
      cantidadAlimentosDesayuno: [],
      cantidadAlimentosAlmuerzo: [],
      cantidadAlimentosCena: [],
      selectedSexo: ".......",
      selectedRangoEdad: ".......",
      gruposNutricionales: [],
      g1: 0,
      g2: 0,
      g3: 0,
      g4: 0,
      g5: 0,
      g6: 0,
      g7: 0,
      auxUnidad: 0,
    };
  },
  components: {
    Load,
  },
  methods: {
    onChildUpdate(objEdadSexo) {
      let sexo = objEdadSexo.sexo.id;
      let edad = objEdadSexo.edad.id;

      var vm = this;
      vm.selectedSexo = objEdadSexo.sexo.nombre;
      vm.selectedRangoEdad = objEdadSexo.edad.nombre;
      axios
        .get(
          "https://backnutriollacicd.herokuapp.com/api/consumo-estimado",
          {
            params: {
              idSexo: sexo,
              idRangoEdad: edad,
            },
          }
        )
        .then(function (res) {
          vm.gruposNutricionales = res.data.data.consumoEstimado;
        });
    },
    changeAlimento: function (pTipo, pKey, value) {
      var vm = this;
      let alimentos = vm.alimentos;

      if (pTipo == "desayuno") {
        let alimentosDesayuno = vm.cantidadAlimentosDesayuno;

        for (let i = 0; i < alimentos.length; i++) {
          if (alimentos[i].Id == value) {
            for (let j = 0; j < alimentosDesayuno.length; j++) {
              if (alimentosDesayuno[j].key == pKey) {
                alimentosDesayuno[j].alimento = Object.assign({}, alimentos[i]);
                break;
              }
            }
            break;
          }
        }
      } else if (pTipo == "almuerzo") {
        let alimentosAlmuerzo = vm.cantidadAlimentosAlmuerzo;

        for (let i = 0; i < alimentos.length; i++) {
          if (alimentos[i].Id == value) {
            for (let j = 0; j < alimentosAlmuerzo.length; j++) {
              if (alimentosAlmuerzo[j].key == pKey) {
                alimentosAlmuerzo[j].alimento = Object.assign({}, alimentos[i]);
                break;
              }
            }
            break;
          }
        }
      } else {
        let alimentosCena = vm.cantidadAlimentosCena;

        for (let i = 0; i < alimentos.length; i++) {
          if (alimentos[i].Id == value) {
            for (let j = 0; j < alimentosCena.length; j++) {
              if (alimentosCena[j].key == pKey) {
                alimentosCena[j].alimento = Object.assign({}, alimentos[i]);
                break;
              }
            }
            break;
          }
        }
      }
      let input = document.querySelectorAll(`button[btn-key="${pKey}"]`);
      for (let i = 0; i < input.length; i++) {
        input[i].removeAttribute("disabled");
      }

      let cbo = document.querySelector(`input[cbo-key="${pKey}"]`);
      cbo.setAttribute("disabled", "disabled");
    },
    focusUnidad: function (key, event) {
      var vm = this;
      vm.auxUnidad = event.target.value;
    },
    eliminar: function (pTipo, key) {
      var vm = this;
      let array = [];

      if (pTipo == "desayuno") {
        array = vm.cantidadAlimentosDesayuno;
      } else if (pTipo == "almuerzo") {
        array = vm.cantidadAlimentosAlmuerzo;
      } else if (pTipo == "cena") {
        array = vm.cantidadAlimentosCena;
      }

      for (let i = 0; i < array.length; i++) {
        if (array[i].key == key) {
          let alimento = Object.assign({}, array[i].alimento);
          let porcion = alimento.porciones;
          if (alimento.IdGrupoAlimenticio == 1) {
            vm.g1 -= isNaN(porcion) ? 0 : porcion;
          } else if (alimento.IdGrupoAlimenticio == 2) {
            vm.g2 -= isNaN(porcion) ? 0 : porcion;
          } else if (alimento.IdGrupoAlimenticio == 3) {
            vm.g3 -= isNaN(porcion) ? 0 : porcion;
          } else if (alimento.IdGrupoAlimenticio == 4) {
            vm.g4 -= isNaN(porcion) ? 0 : porcion;
          } else if (alimento.IdGrupoAlimenticio == 5) {
            vm.g5 -= isNaN(porcion) ? 0 : porcion;
          } else if (alimento.IdGrupoAlimenticio == 6) {
            vm.g6 -= isNaN(porcion) ? 0 : porcion;
          } else if (alimento.IdGrupoAlimenticio == 7) {
            vm.g7 -= isNaN(porcion) ? 0 : porcion;
          }
          array.splice(i, 1);
          break;
        }
      }
      console.log("Array Desayuno=>", vm.cantidadAlimentosDesayuno);
      console.log("Array Almuerzo=>", vm.cantidadAlimentosAlmuerzo);
      console.log("Array Cena=>", vm.cantidadAlimentosCena);
      console.log("Array Grupo Nutricional =>", vm.gruposNutricionales);
      console.log("G1 =>", vm.g1);
      console.log("G2 =>", vm.g2);
      console.log("G3 =>", vm.g3);
      console.log("G4 =>", vm.g4);
      console.log("G5 =>", vm.g5);
      console.log("G6 =>", vm.g6);
      console.log("G7 =>", vm.g7);
    },
    blurUnidad: function (key, pTipo, pOperation) {
      var vm = this;
      let array = [];

      if (pTipo == "desayuno") {
        array = vm.cantidadAlimentosDesayuno;
      } else if (pTipo == "almuerzo") {
        array = vm.cantidadAlimentosAlmuerzo;
      } else if (pTipo == "cena") {
        array = vm.cantidadAlimentosCena;
      }

      let porcion = 1;

      if (pOperation == "-") porcion = -1;

      for (let i = 0; i < array.length; i++) {
        if (array[i].key == key) {
          let alimento = array[i].alimento;

          if (array[i].alimento.porciones == undefined) {
            if (pOperation == "+") {
              array[i].alimento.porciones = porcion;
            }
          } else {
            if (array[i].alimento.porciones >= 0) {
              if (pOperation == "+") array[i].alimento.porciones += porcion;
              else {
                if (array[i].alimento.porciones > 0) {
                  array[i].alimento.porciones += porcion;
                } else {
                  porcion = 0;
                }
              }
            } else {
              porcion = 0;
            }
          }

          console.log("Alimento =>", array[i]);
          console.log("Porcion =>", porcion);

          if (alimento.porciones > -1) {
            if (alimento.IdGrupoAlimenticio == 1) {
              vm.g1 += porcion;
            } else if (alimento.IdGrupoAlimenticio == 2) {
              vm.g2 += porcion;
            } else if (alimento.IdGrupoAlimenticio == 3) {
              vm.g3 += porcion;
            } else if (alimento.IdGrupoAlimenticio == 4) {
              vm.g4 += porcion;
            } else if (alimento.IdGrupoAlimenticio == 5) {
              vm.g5 += porcion;
            } else if (alimento.IdGrupoAlimenticio == 6) {
              vm.g6 += porcion;
            } else if (alimento.IdGrupoAlimenticio == 7) {
              vm.g7 += porcion;
            }
          }
          break;
        }
      }
    },
    addAlimento: function (tipo) {
      var vm = this;
      if (tipo == "desayuno") {
        let key = Math.random() * (100000 - 1) + 1;
        vm.cantidadAlimentosDesayuno.push({ key: key, alimento: {} });
      } else if (tipo == "almuerzo") {
        let key = Math.random() * (100000 - 1) + 1;
        vm.cantidadAlimentosAlmuerzo.push({ key: key, alimento: {} });
      } else if (tipo == "cena") {
        let key = Math.random() * (100000 - 1) + 1;
        vm.cantidadAlimentosCena.push({ key: key, alimento: {} });
      }
    },
  },
  mounted() {
    let self = this;

    // axios.get("https://backnutriollacicd.herokuapp.com/api/sexos")
    // .then(function(res){
    //   self.sexos = res.data;
    // })
    // .catch(function(err){
    //   alert(err);
    // })

    // axios.get("https://backnutriollacicd.herokuapp.com/api/rango-edades")
    // .then(function(res){
    //   self.rangoEdades = res.data.data;
    // })
    // .catch(function(err){
    //   alert(err);
    // });

    axios
      .get("https://backnutriollacicd.herokuapp.com/api/alimentos")
      .then(function (res) {
        self.alimentos = res.data.data;
      });
  },
};
</script>
