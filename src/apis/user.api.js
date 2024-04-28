import axios from "axios";

export default class UserAPI {
  static async signUp(data) {
    try {
      console.log(data);
      const response = await axios.post("/users/signup", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async verificationCode(data) {
    try {
      const response = await axios.post("/users/checkVerification", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async checkDuplicate(data) {
    try {
      const response = await axios.post("/users/checkDuplicate", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async signin(data) {
    try {
      const response = await axios.post("/users/signin", data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getUser(accessToken, password) {
    try {
      const response = await axios.post(
        "/users/info",
        { password },
        {
          headers: {
            Cookie: accessToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async findUser(accessToken) {
    try {
      const response = await axios.get('/users', {
        headers: {
          Cookie: accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getUser(accessToken, password) {
    try {
      const response = await axios.post('/users/info', { password }, {
        headers: {
          Cookie: accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

   // static async getUser(accessToken, password) {
  //   try {
  //     const response = await axios.post(
  //       "/users/info",
  //       { password },
  //       {
  //         headers: {
  //           Cookie: accessToken,
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }

  static async getUserInfo(accessToken) {
    try {
      const response = await axios.get('/users/info', {
        headers: {
          Cookie: accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async top3Title(accessToken) {
    try {
      const response = await axios.get("/titles/top3", {
        headers: {
          Cookie: accessToken,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async findAllTitles(accessToken) {
    try {
      const response = await axios.get("/titles", {
        headers: {
          Cookie: accessToken,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async secession(accessToken, password) {
    try {
      const response = await axios.delete(
        "/users",
        { password },
        {
          headers: {
            Cookie: accessToken,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async editUser(data) {
    try {
      const response = await axios.patch("/users", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async googleLogin(response) {
    try {
      const accessToken = response.accessToken;
      const google = await axios.get(
        `/users/signin/google?accessToken=${accessToken}`
      );
      return google.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async submitAdditionalInfo(accessToken, additionalInfo) {
    try {
      const response = await axios.post(
        "/users/additional-info",
        additionalInfo,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.statusCode === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async naverLogin() {
    try {
      const response = await axios.get("/users/signin/naver");
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async tossConfirm(accessToken, data) {
    try {
      const response = await axios.post("/points/toss", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.status === 201 ? true : false;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async tossFind(accessToken, paymentKey) {
    try {
      const response = await axios.get(`/points/toss/${paymentKey}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { orderName, totalAmount, method, approvedAt } = response.data;

      const responseData = {
        orderName,
        totalAmount,
        method,
        approvedAt,
      };

      return responseData ? responseData : false;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async tossCancel(accessToken, data, paymentKey) {
    try {
      const response = await axios.post(
        `/points/toss/${paymentKey}/cancel`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data.status === "CANCELED" ? true : false;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async updatePoint(accessToken, amount) {
    try {
      const data = { amount: amount };
      const response = await axios.post(`/points`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.statusCode === 200) {
        return response.data.pointNow;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async cancelPayment(accessToken, merchant_uid) {
    try {
      const data = { merchant_uid: merchant_uid };
      const response = await axios.post("/points/kakao/cancel", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.code === 0 ? true : false;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async recommendRestaurant(accessToken) {
    try {
      const response = await axios.get('/recommend', {
        headers: {
          Cookie: accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async rankingTitle() {
    try {
      const response = await axios.get('/titles/ranking');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
